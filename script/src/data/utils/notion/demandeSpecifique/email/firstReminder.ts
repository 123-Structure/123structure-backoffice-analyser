import { IDemande } from "../../../../interfaces/IDemande";
import { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints";

const getText = (demandeSpecifique: IDemande) =>
  `Bonjour,
<break>
Nous tenons à vous recontacter au sujet de votre demande de devis pour votre projet ${
    demandeSpecifique["Type de projet"].includes("Agrandissement") ? "d'" : "de "
  }${demandeSpecifique["Type de projet"].toLowerCase()} (${
    demandeSpecifique["Code postal"]
  } - ${
    demandeSpecifique.Ville
  }). Sauf erreur de notre part, nous n’avons pas reçu les informations complémentaires sur votre projet ni des plans ou des croquis détaillés.
<break>
Afin de pouvoir avancer dans l'élaboration de votre devis et vous proposer une offre précise, il est essentiel pour nous de disposer de ces éléments et de ces informations. Les plans architecturaux, les dimensions et tout autre document technique nous aideront à mieux comprendre vos attentes et à vous présenter une proposition adaptée à votre projet. De plus, vos exigences particulières en matière de matériaux, de finition ou de mode constructif peuvent influer sur notre offre.
<break>
Si vous rencontrez des difficultés pour nous transmettre ces informations, n'hésitez pas à nous en informer afin que nous puissions trouver une solution alternative. Nous sommes là pour vous accompagner tout au long de ce processus.
<break>
Nous comprenons que chaque projet est unique et qu'il est parfois difficile de rassembler toutes les données nécessaires. Si cela est le cas, n’hésitez pas à nous le notifier afin que nous puissions vous accompagner de la meilleure des manières.
<break>
Si vous avez des questions supplémentaires ou si vous avez besoin d'assistance pour préparer les documents, n'hésitez pas à nous contacter.
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
Lieu de construction : ${demandeSpecifique["Code postal"]} - ${demandeSpecifique.Ville}
<break>
Référence de la demande : ${demandeSpecifique.ID}
<break>

<break>
Nous attendons avec impatience votre retour et restons à votre disposition pour toute demande d'information complémentaire.
<break>
Bonne journée
<break>
L’équipe 123 Structure`;

export const firstReminder = (
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
