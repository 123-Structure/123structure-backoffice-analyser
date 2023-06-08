import { IDemande } from "../../../../interfaces/IDemande";

export const emailObject = (demandeAbandonne: IDemande) =>
  `Demande de devis Réf. ${demandeAbandonne.ID} - ${demandeAbandonne.Nom} - ${demandeAbandonne["Code postal"]} ${demandeAbandonne.Ville}`;
