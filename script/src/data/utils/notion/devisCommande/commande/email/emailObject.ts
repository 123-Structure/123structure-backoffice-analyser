import { IDevisCommande } from "../../../../../interfaces/IDevisCommande";

export const emailObject = (commande: IDevisCommande) =>
  `Commande Réf. ${commande.Numéro} - ${
    commande["Adresse de chantier"].split("\n")[0]
  } - ${commande["Adresse de chantier"]
    .split("\n")[2]
    .slice(0, 5)} ${commande["Adresse de chantier"]
    .split("\n")[2]
    .substring(6)}`;
