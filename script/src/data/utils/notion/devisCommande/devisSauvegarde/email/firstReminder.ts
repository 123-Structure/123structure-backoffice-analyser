import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";
import { IDevisCommande } from "../../../../../interfaces/IDevisCommande";

const getText = (devisSauvegarde: IDevisCommande) =>
  `Bonjour,
<break>
Nous tenons à vous recontacter au sujet de votre demande de devis pour votre projet de XXX (${devisSauvegarde[
    "Adresse de chantier"
  ]
    .split("\n")[2]
    .slice(0, 5)} - ${devisSauvegarde["Adresse de chantier"]
    .split("\n")[2]
    .substring(6)})), que nous vous avons envoyé la semaine dernière.
<break>
Sauf erreur de notre part, nous n’avons pas eu de retour concernant la signature et le paiement de ce devis. 
<break>
Avez-vous des questions sur ce devis ? Nous restons à votre disposition pour en rediscuter par téléphone ou par mail. 
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
Nous attendons avec impatience votre retour et restons à votre disposition pour toute demande d'information complémentaire.
<break>
Bonne journée
<break>
L’équipe 123 Structure`;

export const firstReminder = (
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
