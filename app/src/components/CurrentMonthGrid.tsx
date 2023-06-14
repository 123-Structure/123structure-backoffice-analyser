import { Flex } from "@mantine/core";
import NotionDataCard from "./utils/NotionDataCard";
import { useCurrentMonthDemandeAbandonnee } from "../hooks/CurrentMonth/demandeAbandonnee/useCurrentMonthDemandeAbandonnee";
import { useCurrentMonthDemandeSpecifique } from "../hooks/CurrentMonth/demandeSpecifique/useCurrentMonthDemandeSpecifique";
import { useCurrentMonthDevisCommande } from "../hooks/CurrentMonth/devisCommande/useCurrentMonthDevisCommande";

const CurrentMonthGrid = () => {
  const CurrentMonthDemandeSpecifique = useCurrentMonthDemandeSpecifique();
  const CurrentMonthDemandeAbandonne = useCurrentMonthDemandeAbandonnee();
  const CurrentMonthDevisCommande = useCurrentMonthDevisCommande();

  const currentMonth = (monthId: number | undefined) => {
    if (monthId !== undefined) {
      const month = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ];

      return [
        `${month[monthId - 1]} ${new Date().getFullYear()}`,
        `${month[monthId - 2]} ${new Date().getFullYear()}`,
      ];
    }
    return "-";
  };

  const subtitle = `Mois en cours : ${
    currentMonth(CurrentMonthDemandeSpecifique.month)[0]
  }`;

  return (
    <Flex gap="xl" px={"md"}>
      <NotionDataCard
        data={CurrentMonthDemandeSpecifique}
        subtitle={subtitle}
        difference
      />
      <NotionDataCard data={CurrentMonthDemandeAbandonne} subtitle={subtitle} difference/>
      <NotionDataCard data={CurrentMonthDevisCommande} subtitle={subtitle} difference/>
    </Flex>
  );
};

export default CurrentMonthGrid;
