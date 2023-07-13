import { IDemande } from "../../../../interfaces/IDemande";
import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";

const getText = (demandeAbandonne: IDemande) =>
  `Bonjour,
<break>
Nous avons constaté que vous avez débuté une demande de devis sur notre plateforme de devis en ligne pour votre projet ${
    demandeAbandonne["Type de projet"].includes("Agrandissement") ? "d'" : "de "
  }${demandeAbandonne["Type de projet"].toLowerCase()} (${
    demandeAbandonne["Code postal"]
  } - ${demandeAbandonne.Ville}).
<break>
Nous souhaiterions savoir si vous désirez donner suite à cette demande ? Si c’est le cas, afin de pouvoir élaborer un devis personnalisé et répondre au mieux à vos attentes, nous aurions besoin de plus d'informations sur votre projet. Pouvez-vous nous fournir des détails supplémentaires, tels que des plans ou des croquis, qui nous aideront à mieux comprendre la portée du travail à réaliser ?
<break>
Les plans et les dimensions du projet sont essentiels pour évaluer les coûts et les exigences techniques. Si vous avez déjà des plans architecturaux (plan de masse, esquisses, vues en plan, coupes, façades, insertion paysagère, …) et/ou tout autre document (sous-sol voisin si mitoyen, étude de sol de votre terrain, …), nous vous serions reconnaissants de nous les transmettre. Cela nous permettra d'avoir une vision plus précise de votre projet et de vous présenter une offre adaptée.
<break>
Nous travaillons principalement avec des plans au format DWG que votre architecte ou maître d’œuvre peut vous fournir. Dans un premier temps, des fichiers au format PDF peuvent nous suffire pour l’élaboration de votre devis. Attention : l'absence de plans au format DWG, lors de la réalisation de votre étude par notre équipe de dessinateur, pourra engendrer une plus-value due aux temps supplémentaires pour redessiner vos plans informatiquement.
<break>
De plus, si vous avez des exigences particulières en matière de matériaux, de finition ou de mode constructif, veuillez les mentionner dans votre réponse. Plus nous aurons d'informations, plus nous serons en mesure de vous fournir un devis complet et personnalisé.
<break>
Pour finir, pouvez-vous nous confirmer et/ou compléter vos informations de contact ?
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
Lieu de construction : ${demandeAbandonne["Code postal"]} - ${
    demandeAbandonne.Ville
  }
<break>
Référence de la demande : ${demandeAbandonne.ID}
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

export const firstContact = (
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
