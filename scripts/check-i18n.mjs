// Garde-fou de parité multilingue. Échoue (exit 1) si :
//  - un data file fr/en n'a pas les mêmes clés ;
//  - une route ou une expertise manque dans une langue ;
//  - un contenu (dossier avec fr.* ou en.*) n'existe pas dans les deux langues.
// Usage : npm run check
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, relative } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const load = async (rel) => (await import(pathToFileURL(join(root, rel)).href)).default;

// 1. Parité des clés fr/en des data files de copie (asymétries volontaires en allowlist).
const symmetric = {
  "_data/home.js": [],
  "_data/contact.js": [],
  "_data/search.js": [],
  "_data/entities.js": [],
  "_data/expertise.js": ["showExplore", "exploreTitle"], // section « Explorez » FR uniquement
};
for (const [rel, allow] of Object.entries(symmetric)) {
  const d = await load("src/" + rel);
  const fr = Object.keys(d.fr || {});
  const en = Object.keys(d.en || {});
  for (const k of fr)
    if (!en.includes(k) && !allow.includes(k)) errors.push(`${rel} : clé « ${k} » absente en EN`);
  for (const k of en)
    if (!fr.includes(k) && !allow.includes(k)) errors.push(`${rel} : clé « ${k} » absente en FR`);
}

// i18n.json (libellés UI)
const i18n = JSON.parse(readFileSync(join(root, "src/_data/i18n.json"), "utf8"));
for (const k of Object.keys(i18n.fr || {}))
  if (!(k in (i18n.en || {}))) errors.push(`i18n.json : « ${k} » absent en EN`);
for (const k of Object.keys(i18n.en || {}))
  if (!(k in (i18n.fr || {}))) errors.push(`i18n.json : « ${k} » absent en FR`);

// 2. routes.js : chaque route a fr ET en.
const routes = await load("src/_data/routes.js");
for (const [id, r] of Object.entries(routes)) {
  if (!r.fr) errors.push(`routes.js : « ${id} » sans URL fr`);
  if (!r.en) errors.push(`routes.js : « ${id} » sans URL en`);
}

// 3. expertisesNav.js : mêmes ids en fr/en, et tous les ids de `order` présents.
const exp = await load("src/_data/expertisesNav.js");
const frIds = Object.keys(exp.items.fr),
  enIds = Object.keys(exp.items.en);
for (const id of frIds)
  if (!enIds.includes(id)) errors.push(`expertisesNav : « ${id} » absent en EN`);
for (const id of enIds)
  if (!frIds.includes(id)) errors.push(`expertisesNav : « ${id} » absent en FR`);
for (const id of exp.order)
  if (!frIds.includes(id)) errors.push(`expertisesNav.order : « ${id} » introuvable dans items`);

// 4. Parité des contenus : tout dossier portant un fr.* ou en.* doit avoir les deux.
const RE = /^(fr|en)\.(md|njk|html)$/;
const walk = (dir) => {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile()).map((e) => e.name);
  const hasFr = files.some((f) => /^fr\./.test(f) && RE.test(f));
  const hasEn = files.some((f) => /^en\./.test(f) && RE.test(f));
  if (hasFr && !hasEn) errors.push(`Contenu : version EN manquante dans ${relative(root, dir)}`);
  if (hasEn && !hasFr) errors.push(`Contenu : version FR manquante dans ${relative(root, dir)}`);
  for (const e of entries.filter((e) => e.isDirectory())) walk(join(dir, e.name));
};
walk(join(root, "src/content"));

if (errors.length) {
  console.error(
    "✗ Parité multilingue : " +
      errors.length +
      " problème(s)\n" +
      errors.map((e) => "  - " + e).join("\n"),
  );
  process.exit(1);
}
console.log("✓ Parité multilingue OK");
