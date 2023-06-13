import NotionDataLength from "./components/utils/NotionDataLength";
import { useDemandeAbandonnee } from "./hooks/notion/demandeAbandonnee/useDemandeAbandonnee";
import { useDemandeSpecifique } from "./hooks/notion/demandeSpecifique/useDemandeSpecifique";
import { useDevisCommande } from "./hooks/notion/devisCommande/useDevisCommande";

const App = () => {
  const demandeSpecifique = useDemandeSpecifique();
  const demandeAbandonne = useDemandeAbandonnee();
  const devisCommande = useDevisCommande();

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <NotionDataLength length={demandeSpecifique.length} type={"demandeSpecifique"} />
        <NotionDataLength length={demandeAbandonne.length} type={"demandeAbandonnee"} />
        <NotionDataLength length={devisCommande.length} type={"devisCommande"} />
      </div>
    </>
  );
};

export default App;
