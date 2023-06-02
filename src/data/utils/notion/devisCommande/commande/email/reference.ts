import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";
import { IDevisCommande } from "../../../../../interfaces/IDevisCommande";

const getText = (commande: IDevisCommande) =>
  `Vos références :
<break>
${commande["Adresse de chantier"].split("\n")[0]}
<break>
${
  commande.Téléphone[0] === undefined ||
  commande.Téléphone[0] === ""
    ? "-"
    : commande.Téléphone[0]
} / ${
    commande.Téléphone[1] === undefined ||
    commande.Téléphone[1] === ""
      ? ""
      : commande.Téléphone[1]
  } / ${
    commande.Téléphone[2] === undefined ||
    commande.Téléphone[2] === ""
      ? ""
      : commande.Téléphone[2]
  }
<break>
${commande.Email}
<break>
Lieu de construction : ${commande["Adresse de chantier"]
    .split("\n")[2]
    .slice(0, 5)} - ${commande["Adresse de chantier"]
    .split("\n")[2]
    .substring(6)}
<break>
Référence de votre devis : ${commande.Devis}
<break>
Référence de votre commande : ${commande.Numéro}
<break>
Lien pour suivre votre commande : ${commande["Lien unique"]}
<break>`;

export const reference = (
  commande: IDevisCommande
): BlockObjectRequestWithoutChildren[] => {
  const content = getText(commande);

  const blocks = [] as BlockObjectRequestWithoutChildren[];

  content.split("<break>").forEach((block) => {
    blocks.push({
      object: "block",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content: block.trim(),
            },
          },
        ],
      },
    });
  });

  return blocks;
};
