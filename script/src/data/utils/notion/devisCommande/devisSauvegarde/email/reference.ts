import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";
import { IDevisCommande } from "../../../../../interfaces/IDevisCommande";

const getText = (devisSauvegarde: IDevisCommande) =>
  `Vos références :
<break>
${devisSauvegarde["Adresse de chantier"].split("\n")[0]}
<break>
${
  devisSauvegarde.Téléphone[0] === undefined ||
  devisSauvegarde.Téléphone[0] === ""
    ? "-"
    : devisSauvegarde.Téléphone[0]
} / ${
    devisSauvegarde.Téléphone[1] === undefined ||
    devisSauvegarde.Téléphone[1] === ""
      ? ""
      : devisSauvegarde.Téléphone[1]
  } / ${
    devisSauvegarde.Téléphone[2] === undefined ||
    devisSauvegarde.Téléphone[2] === ""
      ? ""
      : devisSauvegarde.Téléphone[2]
  }
<break>
${
  devisSauvegarde.Email[0] === undefined || devisSauvegarde.Email[0] === ""
    ? "-"
    : devisSauvegarde.Email[0]
} / ${
    devisSauvegarde.Email[1] === undefined || devisSauvegarde.Email[1] === ""
      ? ""
      : devisSauvegarde.Email[1]
  } / ${
    devisSauvegarde.Email[2] === undefined || devisSauvegarde.Email[2] === ""
      ? ""
      : devisSauvegarde.Email[2]
  }
<break>
Lieu de construction : ${devisSauvegarde["Adresse de chantier"]
    .split("\n")[2]
    .slice(0, 5)} - ${devisSauvegarde["Adresse de chantier"]
    .split("\n")[2]
    .substring(6)}
<break>
Référence de votre devis : ${devisSauvegarde.Numéro}
<break>
Référence de votre commande : -
<break>
Lien pour suivre votre commande : ${devisSauvegarde["Lien unique"]}
<break>`;

export const reference = (
  devisSauvegarde: IDevisCommande
): BlockObjectRequestWithoutChildren[] => {
  const content = getText(devisSauvegarde);

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
