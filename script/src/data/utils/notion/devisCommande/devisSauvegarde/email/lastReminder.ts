import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";
import { IDevisCommande } from "../../../../../interfaces/IDevisCommande";
import { addDaysToDate } from "../../../../addDaysToDate";

const getText = (devisSauvegarde: IDevisCommande) =>
  `Bonjour,
<break>
Nous souhaitons revenir vers vous concernant votre demande de devis pour votre projet  de XXX (${devisSauvegarde[
    "Adresse de chantier"
  ]
    .split("\n")[2]
    .slice(0, 5)} - ${devisSauvegarde["Adresse de chantier"]
    .split("\n")[2]
    .substring(6)})).
<break>
Nous comprenons que vous pouvez être occupé(e) ou que d'autres facteurs peuvent avoir retardé la transmission de ces documents.
<break>
Nous sommes conscients que chaque projet a ses propres contraintes de temps, mais malheureusement, si nous ne recevons pas les informations demandées d'ici le ${addDaysToDate(
    devisSauvegarde["Date de création"],
    22
  )}, nous ne serons pas en mesure de poursuivre le processus d'élaboration du devis.
<break>
Nous tenons à souligner notre intérêt pour votre projet et notre volonté de vous offrir le meilleur service possible. Nous sommes prêts à vous accompagner dans toutes les étapes de votre projet de construction.
<break>
Si vous avez des questions, des préoccupations ou si vous avez besoin d'une assistance supplémentaire pour préparer les documents, veuillez nous contacter dès que possible. Nous sommes là pour vous aider et faciliter ce processus.
<break>
Nous espérons recevoir les informations manquantes rapidement afin de pouvoir poursuivre notre collaboration. Si nous ne recevons pas de nouvelles de votre part d'ici le ${addDaysToDate(
    devisSauvegarde["Date de création"],
    22
  )}, nous considérerons votre demande comme inactive.
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
Merci de votre compréhension et de votre coopération.
<break>
Bonne journée
<break>
L’équipe 123 Structure`;

export const lastReminder = (
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
