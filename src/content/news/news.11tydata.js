// Donnees de repertoire des actualites : layout + permalink.
// locale et translationKey sont calcules globalement (../content.11tydata.js).
const sectionByLocale = {
  fr: "actualites",
  en: "news",
};

export default {
  layout: "layouts/news-post.njk",
  eleventyComputed: {
    permalink: (data) => {
      const loc = data.page.fileSlug;
      const section = sectionByLocale[loc] || "news";
      return `/${loc}/${section}/${data.slug}/`;
    },
  },
};
