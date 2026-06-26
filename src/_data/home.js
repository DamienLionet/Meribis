// Copie propre à la page d'accueil, par langue. Les URLs viennent de _data/routes.js,
// les 3 entités de _data/entities.js, les 9 expertises de _data/expertisesNav.js — tout
// est consommé dans partials/home-body.njk. Ici : uniquement le texte spécifique à la home.
// Valeurs HTML (heroTitle, stats[].value) rendues via | safe.

export default {
  fr: {
    heroEyebrow: "Le groupe Meritis",
    heroTitle: "Des experts qui vous conseillent.<br />Une organisation qui délivre.",
    heroLead:
      "Conseil, expertise opérationnelle et pilotage. Du cadrage stratégique à l'exécution terrain, avec +900 experts mobilisables.",
    heroImageAlt: "L'équipe Meritis",
    ctaPrimaryLabel: "Parlons de votre projet",
    ctaGhostLabel: "Rejoindre le groupe",
    heroTagline: "Engagé pour durer",
    stats: [
      { value: '900<span class="text-brand-gold">+</span>', label: "consultants experts" },
      { value: '1&nbsp;600<span class="text-brand-gold">+</span>', label: "clients accompagnés" },
      {
        value: '4,5<span class="text-2xl text-brand-gold">/5</span>',
        label: "de satisfaction client",
      },
      { value: "B&nbsp;Corp", label: "entreprise certifiée à impact" },
    ],
    expTitle: "Nos expertises",
    expLead:
      "Nos +900 consultants vous accompagnent avec agilité sur tous vos projets de transformation technologique. Un seul objectif : vous emmener plus loin.",
    expLinkLabel: "Toutes nos expertises",
    entTitle: "3 entités expertes, 1 gouvernance unifiée",
    entLead:
      "Le groupe réunit trois entités complémentaires, pour assurer cohérence stratégique, profondeur sectorielle et continuité d'exécution.",
    clientsEyebrow: "Ils nous font confiance",
    clientsTitle: "Des grands comptes dans les secteurs les plus exigeants",
    rseEyebrow: "Entreprise à impact",
    rseTitle: "Performance économique et impact positif",
    rseText:
      "Certifiée B Corp, engagée pour l'égalité professionnelle et un numérique responsable : nous plaçons l'humain et l'environnement au cœur de notre modèle.",
    rseCtaLabel: "Notre engagement RSE",
    blogTitle: "Le blog Meritis",
    blogLead: "Articles, analyses et retours d'expérience de nos consultants.",
    blogLinkLabel: "Tous les articles",
    jobsTitle: "Rejoignez nos équipes",
    jobsLead: "Découvrez nos opportunités et construisez votre parcours chez Meritis.",
    jobsLinkLabel: "Toutes les offres",
  },

  en: {
    heroEyebrow: "The Meritis Group",
    heroTitle: "Experts who advise you.<br />An organisation that delivers.",
    heroLead:
      "Consulting, operational expertise and delivery governance. From strategic scoping to on-the-ground execution, with over 900 experts ready to be mobilised.",
    heroImageAlt: "The Meritis team",
    ctaPrimaryLabel: "Let's talk about your project",
    ctaGhostLabel: "Join the group",
    heroTagline: "Committed for the long term",
    stats: [
      { value: '900<span class="text-brand-gold">+</span>', label: "expert consultants" },
      { value: '1,600<span class="text-brand-gold">+</span>', label: "clients supported" },
      {
        value: '4.5<span class="text-2xl text-brand-gold">/5</span>',
        label: "client satisfaction",
      },
      { value: "B&nbsp;Corp", label: "certified impact company" },
    ],
    expTitle: "Our expertise",
    expLead:
      "Our 900+ consultants support you with agility across all your technology transformation projects. One goal: to take you further.",
    expLinkLabel: "All our expertise",
    entTitle: "3 expert entities, 1 unified governance",
    entLead:
      "The group brings together three complementary entities, ensuring strategic coherence, sector depth and execution continuity.",
    clientsEyebrow: "They trust us",
    clientsTitle: "Large accounts in the most demanding sectors",
    rseEyebrow: "Impact-driven company",
    rseTitle: "Economic performance and positive impact",
    rseText:
      "B Corp certified, committed to workplace equality and responsible digital: we place people and the environment at the heart of our model.",
    rseCtaLabel: "Our CSR commitment",
    blogTitle: "The Meritis blog",
    blogLead: "Articles, insights and field experience from our consultants.",
    blogLinkLabel: "All articles",
    jobsTitle: "Join our teams",
    jobsLead: "Explore our opportunities and build your career at Meritis.",
    jobsLinkLabel: "All jobs",
  },
};
