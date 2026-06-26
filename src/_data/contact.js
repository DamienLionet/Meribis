// Contenu de la page Contact par langue (structure unique : partials/contact-body.njk).
// notice contient du HTML (rendu via | safe). L'embed MS Forms (src, source-param, href)
// est partagé et reste dans le partial.

export default {
  fr: {
    heroTitle: "Parlons de votre projet",
    heroLead:
      "Une question, un projet ou une candidature ? Écrivez-nous via le formulaire ci-dessous — nous revenons vers vous rapidement.",
    embedTitle: "Formulaire de contact Meritis",
    notice:
      "Le formulaire est fourni par <strong>Microsoft Forms</strong>. Il n'est chargé qu'à votre demande, pour éviter tout dépôt de cookies tiers sans votre accord.",
    buttonLabel: "Afficher le formulaire de contact",
  },
  en: {
    heroTitle: "Let's talk about your project",
    heroLead:
      "A question, a project or an application? Write to us using the form below — we'll get back to you quickly.",
    embedTitle: "Meritis contact form",
    notice:
      "The form is provided by <strong>Microsoft Forms</strong>. It is only loaded at your request, to avoid placing any third-party cookies without your consent.",
    buttonLabel: "Show the contact form",
  },
};
