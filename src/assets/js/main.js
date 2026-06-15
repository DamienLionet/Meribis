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
