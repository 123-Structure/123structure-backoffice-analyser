import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";
import { IDevisCommande } from "../../../../../interfaces/IDevisCommande";

const getText = (devisSauvegarde: IDevisCommande) =>
  `Bonjour,
<break>
Nous avons constaté que vous avez débuté une demande de devis sur notre plateforme de devis en ligne pour votre projet de XXXXX (${devisSauvegarde[
    "Adresse de chantier"
  ]
    .split("\n")[2]
    .slice(0, 5)} - ${devisSauvegarde["Adresse de chantier"]
    .split("\n")[2]
    .substring(6)}).
<break>
Nous souhaiterions savoir si vous désirez donner suite à ce devis ?
<break>
• Si c'est le cas, nous vous invitons à cliquer sur le bouton "Passer commande" sur votre lien unique : ${
    devisSauvegarde["Lien unique"]
  } et remplir le dernier formulaire où vous pourrez, déposer vos pièces écrites et graphiques (plan de masse, esquisses, vues en plan, coupes, façades, insertion paysagère, étude de sol, …).
<break>
[IMAGE 1 - INFORMATIONS COMPLÉMENTAIRES]
<break>
Rappel : Pour réaliser votre dossier d’étude de structure, nous travaillons avec des plans au format DWG que votre architecte ou maître d’œuvre peut vous fournir. L'absence de plans au format DWG, lors de la réalisation de votre étude par notre équipe de dessinateur, pourra engendrer une plus-value due aux temps supplémentaires pour redessiner vos plans informatiquement.
<break>
• Par la suite, vous pourrez régler votre étude de structure en ligne par carte bancaire ou virement. Ce paiement finalisera votre commande.
<break>
[IMAGE 2 - PAIEMENT EN LIGNE]
<break>
Pour finir, pouvez-vous nous confirmer et/ou compléter vos informations de contact ?
<break>

<break>
Vos références :
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
<break>

<break>
Vous êtes un professionnel du secteur du bâtiment et/ou de la construction ? Nous vous invitons à nous l'indiquer afin de vous faire bénéficier de nos tarifs et avantages qui vous sont réservés.
<break>
Nous attendons votre retour et restons à votre disposition pour toute demande d'information complémentaire.
<break>
Bonne journée
<break>
L’équipe 123 Structure
`;

export const contactDevisSauvegarde = (
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
