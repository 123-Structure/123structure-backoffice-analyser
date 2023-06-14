import NotionDataLength from "./components/utils/NotionDataLength";
import { Flex } from "@mantine/core";
import { useDemandeAbandonnee } from "./hooks/notion/AllPages/demandeAbandonnee/useDemandeAbandonnee";
import { useDemandeSpecifique } from "./hooks/notion/AllPages/demandeSpecifique/useDemandeSpecifique";
import { useDevisCommande } from "./hooks/notion/AllPages/devisCommande/useDevisCommande";

const App = () => {
  const demandeSpecifique = useDemandeSpecifique();
  const demandeAbandonne = useDemandeAbandonnee();
  const devisCommande = useDevisCommande();

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
