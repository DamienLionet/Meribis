import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "src", "content", "pages");
const imageRoot = path.join(root, "src", "assets", "images", "pages");

const pages = [
  {
    sourceSlug: "la-rse-chez-meritis",
    folder: "rse",
    locale: "fr",
    permalink: "/fr/la-rse-chez-meritis/",
    title: "La RSE chez Meritis",
    lead: "Nos engagements en faveur de la qualité de vie au travail, de la diversité, de l'égalité, de l'environnement et de l'inclusion.",
    description:
      "La démarche RSE de Meritis : qualité de vie au travail, diversité, égalité professionnelle, environnement, handicap, labels et partenaires.",
  },
  {
    sourceSlug: "meritis-csr",
    folder: "rse",
    locale: "en",
    permalink: "/en/meritis-csr/",
    title: "Meritis CSR",
    lead: "Our commitments to quality of life at work, diversity, gender equality, the environment and inclusion.",
    description:
      "Meritis CSR policy: quality of life at work, diversity, gender equality, environment, labels and partners.",
  },
  {
    sourceSlug: "adn-meritis",
    folder: "adn",
    locale: "fr",
    permalink: "/fr/adn-meritis/",
    title: "Notre culture",
    lead: "L'ADN Meritis : exigence, humilité, bienveillance et proximité au service d'une dynamique collective.",
    description:
      "La culture Meritis : mission, valeurs, différence, aventure entrepreneuriale et chiffres clés.",
  },
  {
    sourceSlug: "our-dna",
    folder: "adn",
    locale: "en",
    permalink: "/en/our-dna/",
    title: "Our DNA",
    lead: "The Meritis DNA: care, proximity, humility and high standards as a shared collective dynamic.",
    description:
      "Meritis culture: mission, values, difference, entrepreneurial story and key numbers.",
  },
];

const htmlEntities = {
  amp: "&",
  apos: "'",
  copy: "\u00a9",
  gt: ">",
  laquo: "\u00ab",
  ldquo: '"',
  lsquo: "'",
  lt: "<",
  nbsp: " ",
  quot: '"',
  raquo: "\u00bb",
  rdquo: '"',
  rsquo: "'",
};

const decodeHtml = (value = "") =>
  String(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => htmlEntities[name.toLowerCase()] ?? match);

const yamlString = (value = "") => JSON.stringify(decodeHtml(value).replace(/\s+/g, " ").trim());

const getAttr = (tag, attr) => {
  const match = tag.match(new RegExp(`${attr}=["']([^"']+)["']`, "i"));
  return match ? decodeHtml(match[1]) : "";
};

const imageExtension = (imageUrl) => {
  const ext = path.extname(new URL(imageUrl).pathname).toLowerCase();
  return [".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"].includes(ext)
    ? ext
    : ".jpg";
};

const ensureUnique = (name, usedNames) => {
  if (!usedNames.has(name)) {
    usedNames.add(name);
    return name;
  }

  const ext = path.extname(name);
  const base = name.slice(0, -ext.length);
  let index = 2;
  let candidate = `${base}-${index}${ext}`;
  while (usedNames.has(candidate)) {
    index += 1;
    candidate = `${base}-${index}${ext}`;
  }
  usedNames.add(candidate);
  return candidate;
};

const downloadImage = async (imageUrl, outputPath) => {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Unable to download ${imageUrl}: ${response.status} ${response.statusText}`);
  }
  await fs.writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
};

const linkMaps = {
  fr: new Map([
    ["/contact/", "/fr/contact/"],
    ["/offres/", "/fr/offres/"],
    ["https://meritis.fr/contact/", "/fr/contact/"],
    ["https://meritis.fr/offres/", "/fr/offres/"],
    ["https://meritis.fr/adn-meritis/", "/fr/adn-meritis/"],
    ["https://meritis.fr/la-rse-chez-meritis/", "/fr/la-rse-chez-meritis/"],
    [
      "https://meritis.fr/actualites/meritis-obtient-la-labellisation-b-corp-un-engagement-reaffirme-pour-un-impact-positif/",
      "/fr/actualites/meritis-obtient-la-labellisation-b-corp-un-engagement-reaffirme-pour-un-impact-positif/",
    ],
    [
      "https://meritis.fr/actualites/meritis-obtient-la-certification-iso/",
      "https://meritis.fr/actualites/meritis-obtient-la-certification-iso/",
    ],
    [
      "https://meritis.fr/actualites/top-3-great-place-to-work/",
      "https://meritis.fr/actualites/top-3-great-place-to-work/",
    ],
    [
      "https://meritis.fr/actualites/women-in-tech-focus-sur-les-femmes-dans-la-tech-chez-meritis/",
      "https://meritis.fr/actualites/women-in-tech-focus-sur-les-femmes-dans-la-tech-chez-meritis/",
    ],
  ]),
  en: new Map([
    ["https://meritis.fr/en/contact-us/", "/en/contact/"],
    ["https://meritis.fr/en/home-career/", "/en/join-us/"],
    ["https://meritis.fr/en/meritis-csr/", "/en/meritis-csr/"],
    ["https://meritis.fr/en/our-dna/", "/en/our-dna/"],
  ]),
};

const rewriteLinks = (html, locale) =>
  html.replace(/href="([^"]+)"/gi, (match, href) => {
    const decoded = decodeHtml(href);
    const map = linkMaps[locale];
    if (map?.has(decoded)) return `href="${map.get(decoded)}"`;
    return match;
  });

const cleanupHtml = (html, locale) =>
  rewriteLinks(html, locale)
    .replace(/\s+srcset="[^"]*"/gi, "")
    .replace(/\s+sizes="[^"]*"/gi, "")
    .replace(/\s+loading="[^"]*"/gi, "")
    .replace(/\s+decoding="[^"]*"/gi, "")
    .replace(/<p>\s*(?:&nbsp;|\u00a0)?\s*<\/p>/gi, "")
    .replace(/<div style="height:\d+px" aria-hidden="true" class="wp-block-spacer"><\/div>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

for (const page of pages) {
  const apiUrl = `https://meritis.fr/wp-json/wp/v2/pages?slug=${page.sourceSlug}&_embed=1`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Unable to fetch ${apiUrl}: ${response.status} ${response.statusText}`);
  }

  const [item] = await response.json();
  if (!item) throw new Error(`No page found for ${page.sourceSlug}`);

  const pageDir = path.join(contentRoot, page.folder);
  const pageImageDir = path.join(imageRoot, page.folder, page.locale);
  const usedNames = new Set();
  const urlToLocalPath = new Map();
  const imageTags = [...String(item.content.rendered).matchAll(/<img\b[^>]*>/gi)];
  const imageUrls = imageTags.map(([tag]) => getAttr(tag, "src")).filter(Boolean);

  await fs.mkdir(pageDir, { recursive: true });
  await fs.mkdir(pageImageDir, { recursive: true });

  let imageIndex = 1;
  for (const imageUrl of imageUrls) {
    if (urlToLocalPath.has(imageUrl)) continue;

    const imageName = ensureUnique(
      `image-${String(imageIndex).padStart(2, "0")}${imageExtension(imageUrl)}`,
      usedNames
    );
    imageIndex += 1;
    const localAsset = `/assets/images/pages/${page.folder}/${page.locale}/${imageName}`;
    await downloadImage(imageUrl, path.join(pageImageDir, imageName));
    urlToLocalPath.set(imageUrl, localAsset);
  }

  let body = String(item.content.rendered);
  for (const [remote, local] of urlToLocalPath.entries()) {
    body = body.split(remote).join(local);
  }
  body = cleanupHtml(body, page.locale);

  const frontMatter = [
    "---",
    "layout: layouts/page.njk",
    `permalink: ${JSON.stringify(page.permalink)}`,
    `title: ${yamlString(page.title)}`,
    `lead: ${yamlString(page.lead)}`,
    `description: ${yamlString(page.description)}`,
    `sourceUrl: ${JSON.stringify(item.link)}`,
    "---",
    "",
  ].join("\n");

  await fs.writeFile(path.join(pageDir, `${page.locale}.md`), `${frontMatter}${body}\n`, "utf8");
  console.log(`${page.locale} ${page.folder}: ${urlToLocalPath.size} images`);
}
