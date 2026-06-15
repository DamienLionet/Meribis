// Configuration Eleventy v3 (ESM). La spec décrivait un `.eleventy.js` CommonJS : obsolète.
// pathPrefix /Meribis/ (GitHub Pages, page projet) — surchargé par PATH_PREFIX (ex. `/` en local).

export default function (eleventyConfig) {
  // Assets copiés tels quels vers dist/ (le CSS est géré séparément par la CLI Tailwind).
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/favicons": "assets/favicons" });

  // Fichier .nojekyll : désactive le traitement Jekyll sur GitHub Pages.
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });

  // Le CSS est écrit par Tailwind directement dans dist/ : on recharge le navigateur
  // quand ce fichier change (le serveur Eleventy ne le génère pas lui-même).
  eleventyConfig.setServerOptions({
    watch: ["dist/assets/css/main.css"],
  });

  // Pages traduisibles (portent un translationKey + locale). Alimente le sélecteur
  // de langue et les hreflang via la donnée calculée `translations` (content.11tydata.js).
  eleventyConfig.addCollection("localized", (collectionApi) =>
    collectionApi
      .getAll()
      .filter((item) => item.data.translationKey && item.data.locale)
  );

  // Dates : ISO (données structurées) + affichage localisé.
  eleventyConfig.addFilter("isoDate", (d) => (d instanceof Date ? d.toISOString() : String(d)));
  eleventyConfig.addFilter("displayDate", (d, locale) => {
    const date = d instanceof Date ? d : new Date(d);
    return date.toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Les images insérées en Markdown utilisent des chemins racine `/assets/...`
  // qui ne passent pas par le filtre `url` : on leur applique le pathPrefix ici.
  eleventyConfig.addTransform("prefixRootLinks", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    const prefix = (process.env.PATH_PREFIX || "/Meribis/").replace(/\/+$/, "");
    if (!prefix) return content;
    // Liens/images en chemin racine issus du Markdown (/fr/…, /assets/…) : le filtre
    // `url` ne s'y applique pas, on ajoute le pathPrefix ici (en sautant le déjà-préfixé).
    const re = new RegExp(`(src|href)="(/(?!${prefix.slice(1)}/)[^"]*)"`, "g");
    return content.replace(re, `$1="${prefix}$2"`);
  });

  // Collections blog / offres par langue (published !== false, tri date décroissante).
  const isPublished = (item) => item.data.published !== false;
  const byDateDesc = (a, b) => b.date - a.date;
  for (const loc of ["fr", "en"]) {
    eleventyConfig.addCollection(`blog_${loc}`, (api) =>
      api.getFilteredByGlob(`src/content/blog/*/${loc}.md`).filter(isPublished).sort(byDateDesc)
    );
    eleventyConfig.addCollection(`jobs_${loc}`, (api) =>
      api.getFilteredByGlob(`src/content/jobs/*/${loc}.md`).filter(isPublished).sort(byDateDesc)
    );
    eleventyConfig.addCollection(`featured_blog_${loc}`, (api) =>
      api
        .getFilteredByGlob(`src/content/blog/*/${loc}.md`)
        .filter(isPublished)
        .filter((item) => item.data.featured)
        .sort(byDateDesc)
    );
  }

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: process.env.PATH_PREFIX || "/Meribis/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
