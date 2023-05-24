import { IDevisSpecifique } from "../../../interfaces/IDevisSpeciques";

export const emailObject = (demandeDevis: IDevisSpecifique) =>
  `Demande de devis ref.${demandeDevis.ID} - ${demandeDevis.Nom} - ${demandeDevis["Code postal"]} ${demandeDevis.Ville}`;
