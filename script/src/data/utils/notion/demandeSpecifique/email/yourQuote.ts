import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";
import { IDemande } from "../../../../interfaces/IDemande";

const getText = (demandeSpecifique: IDemande) =>
  `Bonjour,
<break>
Vous trouverez en pièce jointe votre devis. S'il vous convient, merci de nous le retourner signé en réponse de ce mail.
<break>
[COMMENTAIRES]
<break>
Rappel : Pour réaliser votre dossier d’étude de structure, nous travaillons avec des plans au format DWG que votre architecte ou maître d’œuvre peut vous fournir. L'absence de plans au format DWG, lors de la réalisation de votre étude par notre équipe de dessinateur, pourra engendrer une plus-value due aux temps supplémentaires pour redessiner vos plans informatiquement.
<break>

<break>
Vos références :
<break>
${demandeSpecifique.Nom}
<break>
${
  demandeSpecifique.Téléphone === ""
    ? "Téléphone : Non communiqué"
    : demandeSpecifique.Téléphone
}
<break>
${demandeSpecifique.Email}
<break>
Lieu de construction : ${demandeSpecifique["Code postal"]} - ${
    demandeSpecifique.Ville
  }
<break>
Référence de la demande : ${demandeSpecifique.ID}
<break>

<break>
Nous restons à votre disposition pour toute demande d'information complémentaire.
<break>
Bonne journée
<break>
L’équipe 123 Structure`;

export const yourQuote = (
  demandeSpecifique: IDemande
): BlockObjectRequestWithoutChildren[] => {
  const content = getText(demandeSpecifique);

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
