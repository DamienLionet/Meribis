// Source UNIQUE des routes internes de premier niveau, par langue. Tout lien interne
// (data files, partials, navigation, footer) doit pointer ici via routes.<id>[locale],
// puis passer par le filtre `url` d'Eleventy. Renommer un slug = un seul endroit à changer.
export default {
  home: { fr: "/fr/", en: "/en/" },
  expertises: { fr: "/fr/expertises/", en: "/en/expertise/" },
  blog: { fr: "/fr/blog/", en: "/en/blog/" },
  jobs: { fr: "/fr/offres/", en: "/en/jobs/" },
  news: { fr: "/fr/actualites/", en: "/en/news/" },
  contact: { fr: "/fr/contact/", en: "/en/contact/" },
  search: { fr: "/fr/recherche/", en: "/en/search/" },
  joinGroup: { fr: "/fr/rejoindre-le-groupe/", en: "/en/join-us/" },
  rse: { fr: "/fr/la-rse-chez-meritis/", en: "/en/meritis-csr/" },
  about: { fr: "/fr/a-propos/", en: "/en/about/" },
  adn: { fr: "/fr/adn-meritis/", en: "/en/our-dna/" },
  findUs: { fr: "/fr/nous-trouver/", en: "/en/find-us/" },
  resources: { fr: "/fr/ressources/", en: "/en/resources/" },
  legalNotice: { fr: "/fr/mentions-legales/", en: "/en/legal-notice/" },
  privacy: { fr: "/fr/politique-confidentialite/", en: "/en/privacy-policy/" },
};
