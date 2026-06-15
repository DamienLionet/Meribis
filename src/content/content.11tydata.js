// Données calculées appliquées à toutes les pages sous src/content/.
// `translations` : map { locale: url } des versions partageant le même
// translationKey. Alimente le sélecteur de langue et les balises hreflang.
export default {
  eleventyComputed: {
    translations: (data) => {
      const key = data.translationKey;
      const localized = (data.collections && data.collections.localized) || [];
      const map = {};
      if (key) {
        for (const page of localized) {
          if (page.data.translationKey === key && page.data.locale) {
            map[page.data.locale] = page.url;
          }
        }
      }
      return map;
    },
  },
};
