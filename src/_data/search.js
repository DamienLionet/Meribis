// Contenu de la page Recherche par langue (structure unique : partials/search-body.njk).
// Le markup Pagefind et le script restent dans le partial (identiques FR/EN).

export default {
  fr: {
    heroTitle: "Recherche",
    heroLead: "Trouvez articles, expertises, offres et actualités.",
    popularHeading: "Recherches fréquentes",
    popular: [
      "Data & IA",
      "Cloud",
      "DevOps",
      "Finance",
      "Cybersécurité",
      "Agilité",
      "IA générative",
    ],
    browseHeading: "Parcourir le site",
    browse: [
      {
        route: "expertises",
        title: "Nos expertises",
        desc: "Conseil, ingénierie et delivery sur 9 domaines.",
      },
      { route: "blog", title: "Blog", desc: "Articles, analyses et retours d'expérience." },
      { route: "jobs", title: "Offres d'emploi", desc: "Nos opportunités à pourvoir." },
      { route: "news", title: "Actualités", desc: "La vie et les engagements du groupe." },
    ],
  },
  en: {
    heroTitle: "Search",
    heroLead: "Find articles, expertise, jobs and news.",
    popularHeading: "Popular searches",
    popular: ["Data & AI", "Cloud", "DevOps", "Finance", "Cybersecurity", "Agile", "Generative AI"],
    browseHeading: "Browse the site",
    browse: [
      {
        route: "expertises",
        title: "Our expertise",
        desc: "Consulting, engineering and delivery across 9 areas.",
      },
      { route: "blog", title: "Blog", desc: "Articles, insights and field experience." },
      { route: "jobs", title: "Jobs", desc: "Our open opportunities." },
      { route: "news", title: "News", desc: "Group life and commitments." },
    ],
  },
};
