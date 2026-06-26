// Copie propre à la page Expertises, par langue. Entités → _data/entities.js ;
// tuiles « Explorez » → _data/expertisesNav.js ; URLs → _data/routes.js.
// `showExplore` (FR seulement) affiche la section de tuiles en bas de page.
// satStat contient du HTML (rendu via | safe).

export default {
  fr: {
    heroTitle: "Conseil IT, ingénierie et delivery",
    heroLead:
      "Nous accompagnons les directions IT et métier avec un conseil pragmatique et orienté résultats, capable de sécuriser des transformations durables — de la décision à l'exécution.",
    introTitle: "Un conseil qui sécurise vos décisions technologiques",
    introText:
      "Nous guidons les directions générales et IT dans la définition, la structuration et la mise en œuvre de leurs stratégies technologiques, avec une expertise particulière en Finance et CIB. Nous intervenons lorsque les investissements technologiques sont structurants, les environnements complexes ou critiques, et lorsque l'écart entre vision et exécution fait courir un risque.",
    satStat: '4,5<span class="text-2xl">/5</span>',
    satText: "de satisfaction, sur plus de 1&nbsp;600 clients accompagnés.",
    domainsTitle: "Nos domaines d'intervention",
    domains: [
      { img: "/assets/images/expertise/data-ia.webp", alt: "Data & IA chez Meritis", title: "Data & IA, Digital Engineering", desc: "Plateformes data, gouvernance de la donnée, IA générative, modernisation applicative et DevOps. Nous transformons la donnée en valeur, du socle technique jusqu'aux cas d'usage en production." },
      { img: "/assets/images/expertise/fiabilite.webp", alt: "Fiabilité et performance des services IT", title: "Fiabilité & performance des services IT", desc: "Cloud, réseaux, cybersécurité, environnement de travail et performance applicative. Nous garantissons des services IT robustes, sécurisés et disponibles, à la hauteur des environnements critiques." },
      { img: "/assets/images/expertise/pilotage.webp", alt: "Pilotage de la transformation et impact sociétal", title: "Pilotage & impact sociétal", desc: "Gouvernance de la transformation, organisation IT, numérique responsable et conduite du changement. Nous alignons la stratégie technologique sur vos enjeux métier et sociétaux." },
      { img: "/assets/images/expertise/finance.webp", alt: "Finance et conformité", title: "Finance & conformité", desc: "Opérations front, middle et back office, conformité et ESG. Une double expertise IT et métier au service des banques d'investissement, assureurs et asset managers." },
    ],
    modelTitle: "Un modèle structuré pour sécuriser vos décisions",
    modelLead:
      "Le groupe réunit trois entités complémentaires, pour assurer cohérence stratégique, profondeur sectorielle et continuité d'exécution.",
    showExplore: true,
    exploreTitle: "Explorez nos domaines d'expertise",
  },

  en: {
    heroTitle: "IT consulting, engineering and delivery",
    heroLead:
      "We support IT and business leaders with pragmatic, results-oriented advice, able to secure lasting transformations — from decision to execution.",
    introTitle: "Consulting that secures your technology decisions",
    introText:
      "We guide executive and IT leadership in defining, structuring and implementing their technology strategies, with particular expertise in Finance and CIB. We step in when technology investments are structural, environments are complex or critical, and when the gap between vision and execution creates risk.",
    satStat: '4.5<span class="text-2xl">/5</span>',
    satText: "satisfaction, across more than 1,600 clients supported.",
    domainsTitle: "Our areas of intervention",
    domains: [
      { img: "/assets/images/expertise/data-ia.webp", alt: "Data & AI at Meritis", title: "Data & AI, Digital Engineering", desc: "Data platforms, data governance, generative AI, application modernisation and DevOps. We turn data into value, from the technical foundation to use cases in production." },
      { img: "/assets/images/expertise/fiabilite.webp", alt: "IT service reliability and performance", title: "IT service reliability & performance", desc: "Cloud, networks, cybersecurity, digital workplace and application performance. We ensure robust, secure and available IT services, fit for critical environments." },
      { img: "/assets/images/expertise/pilotage.webp", alt: "Transformation steering and societal impact", title: "Steering & societal impact", desc: "Transformation governance, IT organisation, sustainable digital and change management. We align technology strategy with your business and societal stakes." },
      { img: "/assets/images/expertise/finance.webp", alt: "Finance and compliance", title: "Finance & compliance", desc: "Front, middle and back office operations, compliance and ESG. A dual IT and business expertise serving investment banks, insurers and asset managers." },
    ],
    modelTitle: "A structured model to secure your decisions",
    modelLead:
      "The group brings together three complementary entities, ensuring strategic coherence, sector depth and execution continuity.",
  },
};
