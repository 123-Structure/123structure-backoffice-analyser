import dotenv from "dotenv";

dotenv.config();

const databaseIdDemandesSpecifiques = process.env
  .NOTION_DATABASE_ID_DEMANDES_SPECIFIQUES as string;
const databaseIdDemandesAbandonnees = process.env
  .NOTION_DATABASE_ID_DEMANDES_ABANDONNEES as string;
const databaseIdDevisCommande = process.env
  .NOTION_DATABASE_ID_DEVIS_COMMANDES as string;

export const getDatabaseId = (originalUrl: string): string => {
  if (originalUrl.includes("demandeSpecifique")) {
    return databaseIdDemandesSpecifiques;
  }
  if (originalUrl.includes("demandeAbandonnee")) {
    return databaseIdDemandesAbandonnees;
  }
  if (originalUrl.includes("devisCommande")) {
    return databaseIdDevisCommande;
  }
  return "";
};
