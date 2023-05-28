import { IUrl } from "../interfaces/IUrl";

// Define URLs that should be scrapped
export const scrapedUrl: IUrl[] = [
  {
    id: "❓ demandes_devis_specifiques",
    path: "https://app.123structure.fr/backoffice/userqcm/index/out",
  },
  {
    id: "🗑️ demandes_devis_abandonnees",
    path: "https://app.123structure.fr/backoffice/userqcm/index/pending",
  },
  {
    id: "💾 00-devis_sauvegardes",
    path: "https://app.123structure.fr/backoffice/quote/index/created",
  },
  // {
  //   id: "devis_annules-expires",
  //   path: "https://app.123structure.fr/backoffice/quote/index/cancelled",
  // },
  {
    id: "⌛ commandes_01-attente-validation-initiale-client",
    path: "https://app.123structure.fr/backoffice/order/index/created",
  },
  {
    id: "⌛ commandes_02-attente-paiement-initial",
    path: "https://app.123structure.fr/backoffice/order/index/completed",
  },
  {
    id: "⌛ commandes_03-attente-validation-123-structure",
    path: "https://app.123structure.fr/backoffice/order/index/pending",
  },
  {
    id: "⌛ commandes_04-attente-validation-client",
    path: "https://app.123structure.fr/backoffice/order/index/waiting",
  },
  {
    id: "⌛ commandes_06-en-cours",
    path: "https://app.123structure.fr/backoffice/order/index/in_progress",
  },
  {
    id: "⌛ commandes_05-attente-solde",
    path: "https://app.123structure.fr/backoffice/order/index/payment",
  },
  {
    id: "✅ commandes_07-terminees",
    path: "https://app.123structure.fr/backoffice/order/index/finished",
  },
  // {
  //   id: "commandes_00-annulees",
  //   path: "https://app.123structure.fr/backoffice/order/index/cancelled",
  // },
];
