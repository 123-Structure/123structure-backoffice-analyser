import { IDemande } from "../../../../interfaces/IDemande";

export const emailObject = (demandeAbandonne: IDemande) =>
  `Demande de devis ref.${demandeAbandonne.ID} - ${demandeAbandonne.Nom} - ${demandeAbandonne["Code postal"]} ${demandeAbandonne.Ville}`;
