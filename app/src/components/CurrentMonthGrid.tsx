import { Flex } from "@mantine/core";
import NotionNumberCard from "./Card/NotionNumberCard";
import { useCurrentMonthDemandeAbandonnee } from "../hooks/CurrentMonth/demandeAbandonnee/useCurrentMonthDemandeAbandonnee";
import { useCurrentMonthDemandeSpecifique } from "../hooks/CurrentMonth/demandeSpecifique/useCurrentMonthDemandeSpecifique";
import { useCurrentMonthDevisCommande } from "../hooks/CurrentMonth/devisCommande/useCurrentMonthDevisCommande";
import { IconCalendarPin } from "@tabler/icons-react";
import { useResponsiveQueries } from "../hooks/utils/useResponsiveQueries";
import { useCurrentMonthByCategoryDemandeAbandonnee } from "../hooks/CurrentMonthByCategory/demandeAbandonnee/useCurrentMonthByCategoryDemandeAbandonnee";
import { useCurrentMonthByCategoryDemandeSpecifique } from "../hooks/CurrentMonthByCategory/demandeSpecifique/useCurrentMonthByCategoryDemandeSpecifique";
import { useCurrentMonthByCategoryDevisCommande } from "../hooks/CurrentMonthByCategory/devisCommande/useCurrentMonthByCategoryDevisCommande";
import NotionProgressCard from "./Card/NotionProgressCard";
import GridTitle from "./Card/utils/GridTitle";

const CurrentMonthGrid = () => {
  const { xxl, md } = useResponsiveQueries();

  const CurrentMonthDemandeSpecifique = useCurrentMonthDemandeSpecifique();
  const CurrentMonthDemandeAbandonne = useCurrentMonthDemandeAbandonnee();
  const CurrentMonthDevisCommande = useCurrentMonthDevisCommande();

  const CurrentMonthByCategoryDemandeSpecifique =
    useCurrentMonthByCategoryDemandeSpecifique();
  const CurrentMonthByCategoryDemandeAbandonne =
    useCurrentMonthByCategoryDemandeAbandonnee();
  const CurrentMonthByCategoryDevisCommande =
    useCurrentMonthByCategoryDevisCommande();

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
    <Flex gap="lg" direction="column" w={xxl ? "70%" : "100%"}>
      <GridTitle title={subtitle} icon={<IconCalendarPin />} />
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
      <Flex gap="lg" direction={md ? "row" : "column"}>
        <NotionProgressCard
          data={CurrentMonthByCategoryDemandeSpecifique}
          subtitle={subtitle}
        />
        <NotionProgressCard
          data={CurrentMonthByCategoryDemandeAbandonne}
          subtitle={subtitle}
        />
        <NotionProgressCard
          data={CurrentMonthByCategoryDevisCommande}
          subtitle={subtitle}
        />
      </Flex>
    </Flex>
  );
};

export default CurrentMonthGrid;
