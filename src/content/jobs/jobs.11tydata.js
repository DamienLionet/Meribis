// Données de répertoire des offres : layout + permalink.
// FR -> /fr/offres/<slug>/ ; EN -> /en/jobs/<slug>/ (asymétrie gérée ici).
export default {
  layout: "layouts/job-post.njk",
  eleventyComputed: {
    permalink: (data) => `/${data.page.fileSlug === "fr" ? "fr/offres" : "en/jobs"}/${data.slug}/`,
  },
};
