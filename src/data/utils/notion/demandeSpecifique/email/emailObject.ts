import { IDemande } from "../../../../interfaces/IDemande";

export const emailObject = (demandeSpecifique: IDemande) =>
  `Demande de devis ref.${demandeSpecifique.ID} - ${demandeSpecifique.Nom} - ${demandeSpecifique["Code postal"]} ${demandeSpecifique.Ville}`;
