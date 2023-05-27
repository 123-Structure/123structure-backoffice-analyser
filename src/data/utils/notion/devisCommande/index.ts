import { attenteValidationInitialeClient } from "./attenteValidationInitialeClient";
import { devisSauvegardes } from "./devisSauvegarde";

export const devisCommande = async () => {
  await devisSauvegardes();
  await attenteValidationInitialeClient();
};
