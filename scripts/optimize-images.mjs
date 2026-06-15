// Optimisation des images source (à lancer après avoir ajouté des images) :
//   npm run optimize:images
//
// 1. Convertit chaque PNG/JPG de src/assets/images/ en WebP, en redimensionnant
//    le bord long à MAX_EDGE px max, puis supprime l'original.
//      - sans perte pour les graphiques (transparence, dossier brand/, petites images) ;
//      - qualité 80 pour les photos.
// 2. Réduit les WebP existants déjà trop grands (> MAX_EDGE) — sans les recompresser
//    autrement, pour éviter toute perte de génération.
// 3. Met à jour les références /assets/images/*.{png,jpg,jpeg} -> .webp dans le
//    contenu, les templates et les données.
// 4. Vérifie qu'il ne reste aucune référence raster cassée.
//
// Idempotent : une fois tout converti, une nouvelle exécution ne change rien
// (plus aucun raster à convertir, plus aucune référence .png/.jpg à réécrire).

import sharp from "sharp";
import { readdir, stat, readFile, writeFile, unlink, rename, access } from "node:fs/promises";
import { join, dirname, relative, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_DIR = join(ROOT, "src", "assets", "images");
const REWRITE_DIRS = ["src/content", "src/_includes", "src/_data"].map((p) => join(ROOT, p));
const TEXT_EXT = new Set([".md", ".njk", ".html", ".js", ".mjs", ".json", ".xml", ".txt"]);
const RASTER = new Set([".png", ".jpg", ".jpeg"]);

const MAX_EDGE = 1600; // bord long maximal (px) — large pour les héros, sobre pour le reste
const SMALL_EDGE = 256; // en deçà : picto / icône -> WebP sans perte
const QUALITY = 80; // qualité WebP des photos

const kb = (b) => `${(b / 1024).toFixed(0)} KB`;
const exists = (p) => access(p).then(() => true).catch(() => false);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

// --- 1 & 2. Optimisation des fichiers image ------------------------------------
let inBytes = 0;
let outBytes = 0;
let converted = 0;
let resized = 0;
let untouched = 0;

console.log("Optimisation des images…");
for await (const file of walk(IMAGES_DIR)) {
  const ext = extname(file).toLowerCase();
  const rel = relative(IMAGES_DIR, file).split(sep).join("/");

  if (RASTER.has(ext)) {
    const before = (await stat(file)).size;
    const meta = await sharp(file).metadata();
    const maxDim = Math.max(meta.width || 0, meta.height || 0);
    const out = `${file.slice(0, -ext.length)}.webp`;

    // Pipeline de base (rotation EXIF + redimensionnement), réinstancié à chaque encodage.
    const base = () => {
      let p = sharp(file).rotate();
      if (maxDim > MAX_EDGE) p = p.resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true });
      return p;
    };

    let buf;
    let mode;
    if (rel.startsWith("brand/") || maxDim <= SMALL_EDGE) {
      // Logos, pictos, petits graphiques : sans perte (netteté du trait / du texte).
      buf = await base().webp({ lossless: true, effort: 6 }).toBuffer();
      mode = "lossless";
    } else {
      // Photos & illustrations : on encode dans les deux modes et on garde le plus
      // léger. Le lossy (qui gère aussi la transparence) gagne sur les photos ; le
      // lossless ne l'emporte que sur les aplats, où il est aussi de meilleure qualité.
      const [lossy, lossless] = await Promise.all([
        base().webp({ quality: QUALITY, effort: 6 }).toBuffer(),
        base().webp({ lossless: true, effort: 6 }).toBuffer(),
      ]);
      [buf, mode] = lossless.length < lossy.length ? [lossless, "lossless"] : [lossy, "lossy"];
    }

    await writeFile(out, buf);
    await unlink(file);
    const after = buf.length;
    inBytes += before;
    outBytes += after;
    converted += 1;
    console.log(`  conv  ${rel}  ${kb(before)} -> ${kb(after)}  (${mode})`);
  } else if (ext === ".webp") {
    const meta = await sharp(file).metadata();
    const maxDim = Math.max(meta.width || 0, meta.height || 0);
    if (maxDim > MAX_EDGE) {
      const before = (await stat(file)).size;
      const tmp = `${file}.tmp`;
      await sharp(file).rotate().resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true }).webp({ quality: QUALITY, effort: 6 }).toFile(tmp);
      const after = (await stat(tmp)).size;
      if (after < before) {
        await rename(tmp, file);
        inBytes += before;
        outBytes += after;
        resized += 1;
        console.log(`  rsz   ${rel}  ${kb(before)} -> ${kb(after)}`);
      } else {
        await unlink(tmp);
        untouched += 1;
      }
    } else {
      untouched += 1;
    }
  }
}

// --- 3. Réécriture des références ------------------------------------------------
const REF_RE = /(\/assets\/images\/[^\s"'()]+?)\.(png|jpe?g)\b/gi;
let filesChanged = 0;
let refsChanged = 0;

for (const dir of REWRITE_DIRS) {
  if (!(await exists(dir))) continue;
  for await (const file of walk(dir)) {
    if (!TEXT_EXT.has(extname(file).toLowerCase())) continue;
    const txt = await readFile(file, "utf8");
    let n = 0;
    const next = txt.replace(REF_RE, (_m, base) => {
      n += 1;
      return `${base}.webp`;
    });
    if (n > 0 && next !== txt) {
      await writeFile(file, next);
      filesChanged += 1;
      refsChanged += n;
    }
  }
}

// --- 4. Vérification -------------------------------------------------------------
let dangling = 0;
const missing = [];
const refSeen = new Set();

for (const dir of REWRITE_DIRS) {
  if (!(await exists(dir))) continue;
  for await (const file of walk(dir)) {
    if (!TEXT_EXT.has(extname(file).toLowerCase())) continue;
    const txt = await readFile(file, "utf8");

    // 4a. plus aucune référence raster ne doit subsister
    const raster = txt.match(REF_RE);
    if (raster) {
      dangling += raster.length;
      console.warn(`  ⚠ référence raster restante dans ${relative(ROOT, file)} :`, raster);
    }

    // 4b. chaque .webp référencé doit exister sur le disque
    for (const m of txt.matchAll(/\/assets\/images\/([^\s"'()]+?\.webp)\b/gi)) {
      const key = m[1];
      if (refSeen.has(key)) continue;
      refSeen.add(key);
      if (!(await exists(join(IMAGES_DIR, key)))) missing.push(key);
    }
  }
}

console.log("\n--- Résumé ---");
console.log(`Images converties  : ${converted}`);
console.log(`WebP redimensionnés: ${resized}`);
console.log(`Inchangés          : ${untouched}`);
console.log(`Gain (sur traités) : ${kb(inBytes)} -> ${kb(outBytes)} (${inBytes ? Math.round((1 - outBytes / inBytes) * 100) : 0}% en moins)`);
console.log(`Références réécrites: ${refsChanged} dans ${filesChanged} fichier(s)`);
console.log(`Références raster restantes : ${dangling}`);
console.log(`Références .webp manquantes : ${missing.length}${missing.length ? " -> " + missing.join(", ") : ""}`);

if (dangling > 0 || missing.length > 0) {
  console.error("\n❌ Incohérences détectées (voir ci-dessus).");
  process.exit(1);
}
console.log("\n✅ Images optimisées et références cohérentes.");
