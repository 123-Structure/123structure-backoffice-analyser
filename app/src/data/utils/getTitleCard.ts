export const getTitleCard = (type: string) => {
  switch (type) {
    case "demandeSpecifique":
      return "Demande(s) spécifique(s)";
    case "demandeAbandonnee":
      return "Demande(s) abandonnée(s)";
    case "devisCommande":
      return "Devis et/ou commande(s)";
    default:
      return "-";
  }
};
