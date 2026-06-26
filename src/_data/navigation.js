// Navigation principale, dérivée de routes.js + expertisesNav.js (source unique des URLs).
// Forme identique à l'ancien navigation.json (header/footer itèrent navigation[locale]).
import routes from "./routes.js";
import expertisesNav from "./expertisesNav.js";

const expertiseChildren = (locale) => [
  { label: locale === "fr" ? "Nos expertises" : "Our expertise", url: routes.expertises[locale] },
  ...expertisesNav.order.map((id) => {
    const e = expertisesNav.items[locale][id];
    return { label: e.label, url: e.url };
  }),
];

const build = (locale) => [
  {
    label: locale === "fr" ? "Expertises" : "Expertise",
    url: routes.expertises[locale],
    children: expertiseChildren(locale),
  },
  { label: "Blog", url: routes.blog[locale] },
  { label: locale === "fr" ? "Actualités" : "News", url: routes.news[locale] },
  { label: locale === "fr" ? "Offres" : "Jobs", url: routes.jobs[locale] },
  { label: locale === "fr" ? "À propos" : "About", url: routes.about[locale] },
];

export default { fr: build("fr"), en: build("en") };
