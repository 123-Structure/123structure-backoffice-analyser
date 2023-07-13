import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";
import { IDevisCommande } from "../../../../../interfaces/IDevisCommande";

const getText = (commande: IDevisCommande) =>
`Bonjour,
<break>
Nous avons constaté que vous avez débuté une commande sur notre plateforme de devis en ligne pour votre projet de XXX (${commande["Adresse de chantier"]
    .split("\n")[2]
    .slice(0, 5)} - ${commande["Adresse de chantier"]
    .split("\n")[2]
    .substring(6)}).
<break>
Nous souhaiterions savoir si vous désirez donner suite à cette commande ?
<break>
• Si c'est le cas, nous vous invitons à régler votre étude de structure en ligne par carte bancaire ou virement. Ce paiement finalisera votre commande et lancera la réalisation de votre étude dans le cas où l’ensemble des pièce écrite et graphique nous le permettent.
<break>
Vous trouverez ci-dessous le lien unique pour consulter votre commande en ligne :
<break>
${commande["Lien unique"]}
<break>
[COMMENTAIRES]
<break>
[IMAGE 2 - PAIEMENT EN LIGNE]
<break>
Pour réaliser votre dossier d’étude de structure, nous travaillons avec des plans au format DWG que votre architecte ou maître d’œuvre peut vous fournir. L'absence de plans au format DWG, lors de la réalisation de votre étude par notre équipe de dessinateur, pourra engendrer une plus-value due aux temps supplémentaires pour redessiner vos plans informatiquement.
<break>
Pour finir, pouvez-vous nous confirmer et/ou compléter vos informations de contact ?
<break>

<break>
Vos références :
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
${
  commande.Email[0] === undefined || commande.Email[0] === ""
    ? "-"
    : commande.Email[0]
} / ${
    commande.Email[1] === undefined || commande.Email[1] === ""
      ? ""
      : commande.Email[1]
  } / ${
    commande.Email[2] === undefined || commande.Email[2] === ""
      ? ""
      : commande.Email[2]
  }
<break>
Lieu de construction : ${commande["Adresse de chantier"]
    .split("\n")[2]
    .slice(0, 5)} - ${commande["Adresse de chantier"]
    .split("\n")[2]
    .substring(6)}
<break>
Référence de votre commande : ${commande.Numéro}
<break>
Lien pour suivre votre commande : ${commande["Lien unique"]}
<break>

<break>
Vous êtes un professionnel du secteur du bâtiment et/ou de la construction ? Nous vous invitons à nous l'indiquer afin de vous faire bénéficier de nos tarifs et avantages qui vous sont réservés.
<break>
Nous attendons votre retour et restons à votre disposition pour toute demande d'information complémentaire.
<break>
Bonne journée
<break>
L’équipe 123 Structure`;

export const yourOrder = (
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
