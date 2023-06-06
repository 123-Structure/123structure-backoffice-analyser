import { scrapedUrl } from "../../../constants/scrapedUrl";
import { commande } from "./commande";
import { devisSauvegardes } from "./devisSauvegarde";

export const devisCommande = async () => {
  await devisSauvegardes();
  
  const commandeUrl = scrapedUrl.filter((url) => url.id.includes("commandes"));

  commandeUrl.forEach((url) => {
    commande(url);
  });
};
