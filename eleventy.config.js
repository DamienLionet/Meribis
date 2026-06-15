// Configuration Eleventy v3 (ESM). La spec décrivait un `.eleventy.js` CommonJS : obsolète.
// pathPrefix /Meribis/ (GitHub Pages, page projet) — surchargé par PATH_PREFIX (ex. `/` en local).

export default function (eleventyConfig) {
  // Assets copiés tels quels vers dist/ (le CSS est géré séparément par la CLI Tailwind).
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });

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
