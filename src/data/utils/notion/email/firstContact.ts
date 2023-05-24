import { IDevisSpecifique } from "../../../interfaces/IDevisSpeciques";
import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";

const getText = (demandeDevis: IDevisSpecifique) =>
  `Bonjour,
<break>
L’équipe 123 Structure tient à vous remercier pour votre demande de devis que vous avez réalisée sur notre plateforme de devis en ligne. Nous sommes heureux de vous accompagner dans cette démarche et de vous aider à concrétiser votre projet ${
    demandeDevis["Type de projet"].includes("Agrandissement") ? "d'" : "de "
  }${demandeDevis["Type de projet"].toLowerCase()} (${
    demandeDevis["Code postal"]
  } - ${demandeDevis.Ville}).
<break>
Afin de pouvoir élaborer un devis personnalisé et répondre au mieux à vos attentes, nous aurions besoin de plus d'informations sur votre projet. Pouvez-vous nous fournir des détails supplémentaires, tels que des plans ou des croquis, qui nous aideront à mieux comprendre la portée du travail à réaliser ?
<break>
Les plans et les dimensions du projet sont essentiels pour évaluer les coûts et les exigences techniques. Si vous avez déjà des plans architecturaux (plan de masse, esquisses, vues en plan, coupes, façades, insertion paysagère, …) et/ou tout autre document (sous-sol voisin si mitoyen, étude de sol de votre terrain, …), nous vous serions reconnaissants de nous les transmettre. Cela nous permettra d'avoir une vision plus précise de votre projet et de vous présenter une offre adaptée.
<break>
Nous travaillons principalement avec des plans au format DWG que votre architecte ou maitre d’œuvre peut vous fournir. Dans un premier temps, des fichiers au format PDF peuvent nous suffire pour l’élaboration de votre devis.
<break>
De plus, si vous avez des exigences particulières en matière de matériaux, de finition ou de mode constructif, veuillez les mentionner dans votre réponse. Plus nous aurons d'informations, plus nous serons en mesure de vous fournir un devis complet et personnalisé.
<break>
Pour finir, pouvez-vous nous confirmer et/ou compléter vos informations de contact ?
<break>

<break>
Vos références :
<break>
${demandeDevis.Nom}
<break>
${
  demandeDevis.Téléphone === ""
    ? "Téléphone : Non communiqué"
    : demandeDevis.Téléphone
}
<break>
${demandeDevis.Email}
<break>
Lieu de construction : ${demandeDevis["Code postal"]} - ${demandeDevis.Ville}
<break>
Référence de la demande : ${demandeDevis.ID}
<break>

<break>
Nous sommes impatients de travailler avec vous et de réaliser votre projet ${
    demandeDevis["Type de projet"].includes("Agrandissement") ? "d'" : "de "
  }${demandeDevis[
    "Type de projet"
  ].toLowerCase()}. Merci encore pour votre confiance.
<break>
Nous restons disponibles si besoin.
<break>
Bonne journée
<break>
L’équipe 123 Structure
`;

export const firstContact = (
  demandeDevis: IDevisSpecifique
): BlockObjectRequestWithoutChildren[] => {
  const content = getText(demandeDevis);

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
