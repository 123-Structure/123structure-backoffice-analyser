import { Flex } from "@mantine/core";
import { useAllPagesDemandeAbandonnee } from "../hooks/AllPages/demandeAbandonnee/useAllPagesDemandeAbandonnee";
import { useAllPagesDemandeSpecifique } from "../hooks/AllPages/demandeSpecifique/useAllPagesDemandeSpecifique";
import { useAllPagesDevisCommande } from "../hooks/AllPages/devisCommande/useAllPagesDevisCommande";
import NotionDataCard from "./utils/NotionDataCard";

const AllPagesGrid = () => {
  const AllPagesDemandeSpecifique = useAllPagesDemandeSpecifique();
  const AllPagesDemandeAbandonne = useAllPagesDemandeAbandonnee();
  const AllPagesDevisCommande = useAllPagesDevisCommande();

  return (
    <Flex gap="xl" px={"md"}>
      <NotionDataCard
        data={AllPagesDemandeSpecifique}
        subtitle={"Depuis le 29/05/2023"}
      />
      <NotionDataCard
        data={AllPagesDemandeAbandonne}
        subtitle={"Depuis le 29/05/2023"}
      />
      <NotionDataCard
        data={AllPagesDevisCommande}
        subtitle={"Depuis le 29/05/2023"}
      />
    </Flex>
  );
};

export default AllPagesGrid;
