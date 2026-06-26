// Minifie les fichiers JS vanilla vers dist/ (étape de publication, lancée par build:all).
// Les sources restent lisibles ; en dev (npm start) Eleventy sert le JS non minifié.
// Chaque fichier est un module ES (<script type="module">), traité indépendamment.

import { minify } from "terser";
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src", "assets", "js");
const OUT = join(ROOT, "dist", "assets", "js");

await mkdir(OUT, { recursive: true });

let inBytes = 0;
let outBytes = 0;
for (const name of await readdir(SRC)) {
  if (!name.endsWith(".js")) continue;
  const code = await readFile(join(SRC, name), "utf8");
  const result = await minify(code, { module: true, compress: true, mangle: true });
  if (result.error) throw result.error;
  await writeFile(join(OUT, name), result.code);
  inBytes += Buffer.byteLength(code);
  outBytes += Buffer.byteLength(result.code);
  console.log(`  min  ${name}  ${code.length} -> ${result.code.length} o`);
}
console.log(
  `JS minifié : ${inBytes} -> ${outBytes} o (${inBytes ? Math.round((1 - outBytes / inBytes) * 100) : 0}% en moins)`,
);
