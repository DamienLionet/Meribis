// Les 9 domaines d'expertise — définition unique (url + icône + libellé), par langue.
// `order` = ordre canonique d'affichage (flagships Data & Finance d'abord), réutilisé par
// la home, la page Expertises et le menu. Lecture : expertisesNav.items[locale][id].
export default {
  order: [
    "dataIa",
    "finance",
    "cloud",
    "devops",
    "softwareFactory",
    "cybersecurity",
    "projectManagement",
    "digitalWorkspace",
    "agile",
  ],
  items: {
    fr: {
      dataIa: { url: "/fr/expertises/data-ia/", icon: "i-data", label: "Data & IA" },
      finance: { url: "/fr/expertises/finance/", icon: "i-finance", label: "Finance" },
      cloud: { url: "/fr/expertises/cloud/", icon: "i-cloud", label: "Cloud" },
      devops: { url: "/fr/expertises/devops/", icon: "i-devops", label: "DevOps" },
      softwareFactory: {
        url: "/fr/expertises/software-factory/",
        icon: "i-code",
        label: "Software Factory",
      },
      cybersecurity: {
        url: "/fr/expertises/service-cybersecurite/",
        icon: "i-shield",
        label: "Cybersécurité",
      },
      projectManagement: {
        url: "/fr/expertises/pilotage-de-projet/",
        icon: "i-pilotage",
        label: "Pilotage de projet",
      },
      digitalWorkspace: {
        url: "/fr/expertises/digital-workspace/",
        icon: "i-workspace",
        label: "Digital Workspace",
      },
      agile: { url: "/fr/expertises/agile/", icon: "i-agile", label: "Agilité" },
    },
    en: {
      dataIa: { url: "/en/expertise/data-ai/", icon: "i-data", label: "Data & AI" },
      finance: { url: "/en/expertise/finance/", icon: "i-finance", label: "Finance" },
      cloud: { url: "/en/expertise/cloud/", icon: "i-cloud", label: "Cloud" },
      devops: { url: "/en/expertise/devops/", icon: "i-devops", label: "DevOps" },
      softwareFactory: {
        url: "/en/expertise/software-factory/",
        icon: "i-code",
        label: "Software Factory",
      },
      cybersecurity: {
        url: "/en/expertise/cybersecurity/",
        icon: "i-shield",
        label: "Cybersecurity",
      },
      projectManagement: {
        url: "/en/expertise/project-management/",
        icon: "i-pilotage",
        label: "Project management",
      },
      digitalWorkspace: {
        url: "/en/expertise/digital-workspace/",
        icon: "i-workspace",
        label: "Digital Workspace",
      },
      agile: { url: "/en/expertise/agile/", icon: "i-agile", label: "Agile" },
    },
  },
};
