import { IDevisCommande } from "../../../../../interfaces/IDevisCommande";

export const emailObject = (devisSauvegarde: IDevisCommande) =>
  `Devis sauvegardé ref.${devisSauvegarde.Numéro} - ${
    devisSauvegarde["Adresse de chantier"].split("\n")[0]
  } - ${devisSauvegarde["Adresse de chantier"]
    .split("\n")[2]
    .slice(0, 5)} ${devisSauvegarde["Adresse de chantier"]
    .split("\n")[2]
    .substring(7)}`;
