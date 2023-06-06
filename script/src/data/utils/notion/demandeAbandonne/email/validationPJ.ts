import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";

const getText = () =>
  `Bonjour,
<break>
Nous vous remercions pour vos pièces jointes. Nous reviendrons prochainement vers vous avec une proposition de devis.
<break>
Rappel : l'absence de plans au format DWG, lors de la réalisation de votre étude par notre équipe de dessinateur, pourra engendrer une plus-value due aux temps supplémentaires pour redessiner vos plans informatiquement.
<break>
Nous n’hésiterons pas à vous recontacter si nous avons besoin de plus d’informations.
<break>
Bonne journée
<break>
L’équipe 123 Structure
`;

export const validationPJ = (): BlockObjectRequestWithoutChildren[] => {
  const content = getText();

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
