// Données calculées pour tout src/content/ :
//   - locale         : déduite du nom de fichier (fr.md / en.md)
//   - translationKey : déduite du nom de dossier (dossier = clé partagée FR/EN)
//   - translations   : map { locale: url } des versions partageant ce translationKey
//     (alimente le sélecteur de langue et les balises hreflang).
const keyFromPath = (page) => {
  const parts = page.filePathStem.split("/");
  return parts[parts.length - 2];
};

export default {
  eleventyComputed: {
    locale: (data) => data.page.fileSlug,
    translationKey: (data) => keyFromPath(data.page),
    translations: (data) => {
      const key = keyFromPath(data.page);
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
