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

document.addEventListener("click", (event) => closeDropdowns((group) => !group.contains(event.target)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDropdowns(() => true);
});
