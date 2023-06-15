import { Flex } from "@mantine/core";
import NotionNumberCard from "./utils/NotionNumberCard";
import { useCurrentMonthDemandeAbandonnee } from "../hooks/CurrentMonth/demandeAbandonnee/useCurrentMonthDemandeAbandonnee";
import { useCurrentMonthDemandeSpecifique } from "../hooks/CurrentMonth/demandeSpecifique/useCurrentMonthDemandeSpecifique";
import { useCurrentMonthDevisCommande } from "../hooks/CurrentMonth/devisCommande/useCurrentMonthDevisCommande";
import NotionDataTitle from "./utils/NotionDataTitle";
import { IconCalendarPin } from "@tabler/icons-react";
import { useResponsiveQueries } from "../data/utils/useResponsiveQueries";

const CurrentMonthGrid = () => {
  const { xxl, md } = useResponsiveQueries();
  
  const CurrentMonthDemandeSpecifique = useCurrentMonthDemandeSpecifique();
  const CurrentMonthDemandeAbandonne = useCurrentMonthDemandeAbandonnee();
  const CurrentMonthDevisCommande = useCurrentMonthDevisCommande();

  const currentMonth = () => {
    const monthId = new Date().getMonth() + 1;

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
  };

  const subtitle = `Mois en cours : ${currentMonth()[0]}`;

  return (
    <Flex direction="column" w={xxl ? "70%" : "100%"}>
      <NotionDataTitle title={subtitle} icon={<IconCalendarPin />} />
      <Flex gap="lg" direction={md ? "row" : "column"}>
        <NotionNumberCard
          data={CurrentMonthDemandeSpecifique}
          subtitle={subtitle}
        />
        <NotionNumberCard
          data={CurrentMonthDemandeAbandonne}
          subtitle={subtitle}
        />
        <NotionNumberCard
          data={CurrentMonthDevisCommande}
          subtitle={subtitle}
        />
      </Flex>
    </Flex>
  );
};

export default CurrentMonthGrid;
