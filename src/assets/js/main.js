// Point d'entrée JS vanilla — amélioration progressive.
// Le site doit rester consultable sans JS ; ce fichier ne fait qu'ajouter des
// crochets activés uniquement quand JS est disponible.

// Marque le document comme « JS actif » : permet de cibler en CSS les
// comportements qui dépendent de JS (menu mobile, accordéons à venir).
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");
