// Données de répertoire des articles de blog : layout + permalink.
// locale et translationKey sont calculés globalement (../content.11tydata.js).
export default {
  layout: "layouts/blog-post.njk",
  eleventyComputed: {
    permalink: (data) => `/${data.page.fileSlug}/blog/${data.slug}/`,
  },
};
