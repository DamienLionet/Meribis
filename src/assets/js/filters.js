// Filtres + recherche côté client sur les listes (blog, offres).
// Amélioration progressive : sans JS, l'UI de filtres est masquée (.js-only)
// et toutes les cartes restent visibles.

const filtersEl = document.querySelector("[data-filters]");
const listEl = document.querySelector("[data-list]");

if (filtersEl && listEl) {
  const cards = Array.from(listEl.children);
  const searchInput = filtersEl.querySelector("[data-search]");
  const selects = Array.from(filtersEl.querySelectorAll("[data-filter]"));
  const emptyEl = document.querySelector("[data-empty]");

  const apply = () => {
    const query = (searchInput && searchInput.value || "").trim().toLowerCase();
    const active = selects
      .map((s) => [s.dataset.filter, s.value])
      .filter(([, value]) => value);

    let visible = 0;
    for (const card of cards) {
      const matchesText = !query || card.textContent.toLowerCase().includes(query);
      const matchesFilters = active.every(([key, value]) => (card.dataset[key] || "") === value);
      const show = matchesText && matchesFilters;
      card.hidden = !show;
      if (show) visible += 1;
    }
    if (emptyEl) emptyEl.hidden = visible !== 0;
  };

  if (searchInput) searchInput.addEventListener("input", apply);
  selects.forEach((s) => s.addEventListener("change", apply));
}
