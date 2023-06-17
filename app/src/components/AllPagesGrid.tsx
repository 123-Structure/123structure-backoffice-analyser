import { Flex } from "@mantine/core";
import { useAllPagesDemandeAbandonnee } from "../hooks/AllPages/demandeAbandonnee/useAllPagesDemandeAbandonnee";
import { useAllPagesDemandeSpecifique } from "../hooks/AllPages/demandeSpecifique/useAllPagesDemandeSpecifique";
import { useAllPagesDevisCommande } from "../hooks/AllPages/devisCommande/useAllPagesDevisCommande";
import NotionNumberCard from "./Card/NotionNumberCard";
import { IconFlag } from "@tabler/icons-react";
import { useResponsiveQueries } from "../hooks/utils/useResponsiveQueries";
import GridTitle from "./Card/utils/GridTitle";

const AllPagesGrid = () => {
  const { xxl, md } = useResponsiveQueries();

  const AllPagesDemandeSpecifique = useAllPagesDemandeSpecifique();
  const AllPagesDemandeAbandonne = useAllPagesDemandeAbandonnee();
  const AllPagesDevisCommande = useAllPagesDevisCommande();

  return (
    <Flex gap="lg" direction={"column"} w={xxl ? "70%" : "100%"}>
      <GridTitle title="Depuis le 29/05/2023" icon={<IconFlag />} />
      <Flex gap="lg" direction={md ? "row" : "column"}>
        <NotionNumberCard
          data={AllPagesDemandeSpecifique}
          subtitle={"Depuis le 29/05/2023"}
        />
        <NotionNumberCard
          data={AllPagesDemandeAbandonne}
          subtitle={"Depuis le 29/05/2023"}
        />
        <NotionNumberCard
          data={AllPagesDevisCommande}
          subtitle={"Depuis le 29/05/2023"}
        />
      </Flex>
    </Flex>
  );
};

export default AllPagesGrid;
