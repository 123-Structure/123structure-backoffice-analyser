import { IDemande } from "../../../../interfaces/IDemande";
import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";
import { addDaysToDate } from "../../../addDaysToDate";

const getText = (demandeAbandonne: IDemande) =>
  `Bonjour,
<break>
Nous souhaitons revenir vers vous concernant votre demande de devis pour votre projet  ${
    demandeAbandonne["Type de projet"].includes("Agrandissement") ? "d'" : "de "
  }${demandeAbandonne["Type de projet"].toLowerCase()} (${
    demandeAbandonne["Code postal"]
  } - ${
    demandeAbandonne.Ville
  }). Nous avons précédemment échangé et nous n’avons pas reçu les informations complémentaires ou les pièces graphiques que nous vous avions demandées. 
<break>
Nous comprenons que vous pouvez être occupé(e) ou que d'autres facteurs peuvent avoir retardé la transmission de ces documents. Nous souhaiterions savoir si vous désirez donner suite à cette demande ? Si c’est le cas, afin de pouvoir vous proposer une offre précise dans les meilleurs délais, il est important pour nous de disposer de ces éléments.
<break>
Nous sommes conscients que chaque projet a ses propres contraintes de temps, mais malheureusement, si nous ne recevons pas les informations demandées d'ici le ${addDaysToDate(
    demandeAbandonne["Créé le"],
    22
  )}, nous ne serons pas en mesure de poursuivre le processus d'élaboration du devis.
<break>
Nous tenons à souligner notre intérêt pour votre projet et notre volonté de vous offrir le meilleur service possible. Nous sommes prêts à vous accompagner dans toutes les étapes de votre projet de construction.
<break>
Si vous avez des questions, des préoccupations ou si vous avez besoin d'une assistance supplémentaire pour préparer les documents, veuillez nous contacter dès que possible. Nous sommes là pour vous aider et faciliter ce processus.
<break>
Nous espérons recevoir les informations manquantes rapidement afin de pouvoir poursuivre notre collaboration. Si nous ne recevons pas de nouvelles de votre part d'ici le ${addDaysToDate(
    demandeAbandonne["Créé le"],
    22
  )}, nous considérerons votre demande comme inactive.
<break>

<break>
Vos références :
<break>
${demandeAbandonne.Nom}
<break>
${
  demandeAbandonne.Téléphone === ""
    ? "Téléphone : Non communiqué"
    : demandeAbandonne.Téléphone
}
<break>
${demandeAbandonne.Email}
<break>
Lieu de construction : ${demandeAbandonne["Code postal"]} - ${demandeAbandonne.Ville}
<break>
Référence de la demande : ${demandeAbandonne.ID}
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
  demandeAbandonne: IDemande
): BlockObjectRequestWithoutChildren[] => {
  const content = getText(demandeAbandonne);

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
