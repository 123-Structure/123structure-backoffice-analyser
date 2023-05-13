import { IUrl } from "../interfaces/IUrl";

// Define URLs that should be scrapped
export const scrapedUrl: IUrl[] = [
  {
    id: "devis_sauvegardee",
    path: "https://app.123structure.fr/backoffice/quote/index/created",
  },
  {
    id: "devis_annules-expires",
    path: "https://app.123structure.fr/backoffice/quote/index/cancelled",
  },
];