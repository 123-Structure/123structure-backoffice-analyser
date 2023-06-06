import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";
import { IDevisCommande } from "../../../../../interfaces/IDevisCommande";

const getText = (devisSauvegarde: IDevisCommande) =>
  `Bonjour,
<break>
Vous trouverez ci-dessous le lien unique pour consulter votre devis en ligne :
<break>
${devisSauvegarde["Lien unique"]}
<break>
[COMMENTAIRES]
<break>
 • Si le devis vous convient, vous pouvez passer commande et remplir le dernier formulaire où vous pourrez, une nouvelle fois, déposer vos pièces écrites et graphiques.
<break>
[IMAGE 1 - INFORMATIONS COMPLÉMENTAIRES]
<break>
Rappel : Pour réaliser votre dossier d’étude de structure, nous travaillons avec des plans au format DWG que votre architecte ou maître d’œuvre peut vous fournir. L'absence de plans au format DWG, lors de la réalisation de votre étude par notre équipe de dessinateur, pourra engendrer une plus-value due aux temps supplémentaires pour redessiner vos plans informatiquement.
<break>
• Par la suite, vous pourrez régler votre étude de structure en ligne par carte bancaire ou virement. Ce paiement finalisera votre commande.
<break>
[IMAGE 2 - PAIEMENT EN LIGNE]
<break>

<break>
Vos références à nous rappeler lors de nos échanges :
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
Lien pour suivre votre commande : ${devisSauvegarde["Lien unique"]}
<break>

<break>
Nous restons à votre disposition pour toute demande d'information complémentaire.
<break>
Bonne journée
<break>
L’équipe 123 Structure`;

export const yourQuote = (
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
