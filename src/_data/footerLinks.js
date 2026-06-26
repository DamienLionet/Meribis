// Liens du footer, dérivés de routes.js (source unique des URLs).
import routes from "./routes.js";

const build = (locale) => [
  { label: locale === "fr" ? "Ressources" : "Resources", url: routes.resources[locale] },
  { label: "Contact", url: routes.contact[locale] },
  { label: locale === "fr" ? "Rejoindre le groupe" : "Join us", url: routes.joinGroup[locale] },
  { label: locale === "fr" ? "Nous trouver" : "Find us", url: routes.findUs[locale] },
  { label: locale === "fr" ? "ADN Meritis" : "Our DNA", url: routes.adn[locale] },
  { label: locale === "fr" ? "RSE chez Meritis" : "CSR commitment", url: routes.rse[locale] },
  { label: locale === "fr" ? "Mentions légales" : "Legal notice", url: routes.legalNotice[locale] },
  { label: locale === "fr" ? "Politique de confidentialité" : "Privacy policy", url: routes.privacy[locale] },
];

export default { fr: build("fr"), en: build("en") };
