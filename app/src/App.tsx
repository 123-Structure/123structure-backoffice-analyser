import NotionDataLength from "./components/utils/NotionDataLength";
import { Flex } from "@mantine/core";
import { useAllPagesDemandeSpecifique } from "./hooks/AllPages/demandeSpecifique/useAllPagesDemandeSpecifique";
import { useAllPagesDemandeAbandonnee } from "./hooks/AllPages/demandeAbandonnee/useAllPagesDemandeAbandonnee";
import { useAllPagesDevisCommande } from "./hooks/AllPages/devisCommande/useAllPagesDevisCommande";

const App = () => {
  const demandeSpecifique = useAllPagesDemandeSpecifique();
  const demandeAbandonne = useAllPagesDemandeAbandonnee();
  const devisCommande = useAllPagesDevisCommande();

  return (
    <>
      <Flex gap="xl" p="xl">
        <NotionDataLength
          data={demandeSpecifique}
          subtitle={`Depuis le ${demandeSpecifique.period.start}`}
        />
        <NotionDataLength
          data={demandeAbandonne}
          subtitle={`Depuis le ${demandeAbandonne.period.start}`}
        />
        <NotionDataLength
          data={devisCommande}
          subtitle={`Depuis le ${demandeAbandonne.period.start}`}
        />
      </Flex>
    </>
  );
};

export default App;
