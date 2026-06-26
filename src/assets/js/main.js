// Point d'entrée JS vanilla — amélioration progressive.
// Sans JS, le site reste consultable (le menu mobile reste ouvert, cf. CSS .no-js).

// Marque le document comme « JS actif » (bascule les règles .no-js / .js du CSS).
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

// Menu mobile : repli par défaut + bascule accessible (aria-expanded, Échap).
const toggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-mobile-menu]");

if (toggle && menu) {
  const setOpen = (open) => {
    menu.classList.toggle("is-collapsed", !open);
    toggle.setAttribute("aria-expanded", String(open));
    const label = open ? toggle.dataset.labelClose : toggle.dataset.labelOpen;
    if (label) toggle.setAttribute("aria-label", label);
  };

  // Replié au chargement (la règle `.js [data-mobile-menu].is-collapsed` le masque).
  setOpen(false);

  toggle.addEventListener("click", () => {
    setOpen(menu.classList.contains("is-collapsed"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.classList.contains("is-collapsed")) {
      setOpen(false);
      toggle.focus();
    }
  });
}

// Menus déroulants (nav) : clic = ouvrir/fermer (tactile) ; survol et focus clavier
// gérés en CSS. Fermeture au clic extérieur et à Échap.
document.querySelectorAll("[data-dropdown-toggle]").forEach((btn) => {
  const group = btn.closest(".group");
  if (!group) return;
  btn.addEventListener("click", () => {
    const open = group.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
});

const closeDropdowns = (predicate) => {
  document.querySelectorAll(".group.is-open").forEach((group) => {
    if (predicate(group)) {
      group.classList.remove("is-open");
      const t = group.querySelector("[data-dropdown-toggle]");
      if (t) t.setAttribute("aria-expanded", "false");
    }
  });
};

document.addEventListener("click", (event) =>
  closeDropdowns((group) => !group.contains(event.target)),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDropdowns(() => true);
});

// Embeds tiers (formulaire MS Forms, vidéo YouTube…) : chargés UNIQUEMENT au clic.
// RGPD/vie privée : aucune requête ni cookie tiers tant que l'utilisateur n'a pas agi.
// Sans JS, le déclencheur reste un lien classique vers le service (repli fonctionnel).
document.querySelectorAll("[data-embed]").forEach((box) => {
  const trigger = box.querySelector("[data-embed-load]");
  if (!trigger) return;
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    let src = box.dataset.embedSrc;
    const param = box.dataset.sourceParam; // ex. champ « source » MS Forms préfilled depuis ?source=
    if (param) {
      const source = new URLSearchParams(location.search).get("source");
      if (source) src += (src.includes("?") ? "&" : "?") + param + "=" + encodeURIComponent(source);
    }
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = box.dataset.embedTitle || "";
    iframe.loading = "lazy";
    iframe.setAttribute("allowfullscreen", "");
    if (box.dataset.embedAllow) iframe.setAttribute("allow", box.dataset.embedAllow);
    iframe.className = "w-full rounded-card";
    iframe.style.border = "0";
    if (box.dataset.embedHeight) iframe.style.height = box.dataset.embedHeight + "px";
    else iframe.style.aspectRatio = "16 / 9";
    box.replaceChildren(iframe);
  });
});

// Révélations au scroll : fondu + légère montée des cartes et des blocs marqués
// [data-reveal]. Amélioration progressive : sans JS rien n'est masqué ; on respecte
// prefers-reduced-motion (aucun masquage si l'utilisateur demande moins de mouvement).
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(".card, [data-reveal]");
  if (targets.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    targets.forEach((el) => {
      el.classList.add("reveal-on-scroll");
      io.observe(el);
    });
  }
}
