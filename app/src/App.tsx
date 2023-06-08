import { Button, Card, List } from "@mantine/core";
import { useDemandeAbandonnee } from "./hooks/notion/demandeAbandonnee/useDemandeAbandonnee";
import { useUpdateDemandeAbandonnee } from "./hooks/notion/demandeAbandonnee/useUpdateDemandeAbandonnee";
import { useDemandeSpecifique } from "./hooks/notion/demandeSpecifique/useDemandeSpecifique";
import { useUpdateDemandeSpecifique } from "./hooks/notion/demandeSpecifique/useUpdateDemandeSpecifique";
import { useUpdateDevisCommande } from "./hooks/notion/devisCommande/useUpdateDevisCommande";
import { useDevisCommande } from "./hooks/notion/devisCommande/useDevisCommande";

const App = () => {
  const demandeSpecifique = useDemandeSpecifique();
  const setDemandeSpecifique = useUpdateDemandeSpecifique();
  const demandeAbandonnee = useDemandeAbandonnee();
  const setDemandeAbandonnee = useUpdateDemandeAbandonnee();
  const devisCommande = useDevisCommande();
  const setDevisCommande = useUpdateDevisCommande();

  const handleDemandeSpecifique = () => {
    fetch("http://localhost:3000/api/demandeSpecifique")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDemandeSpecifique(data.resListts);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDemandeAbandonnee = () => {
    fetch("http://localhost:3000/api/demandeAbandonnee")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDemandeAbandonnee(data.resListts);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleDevisCommande = () => {
    fetch("http://localhost:3000/api/devisCommande")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDevisCommande(data.resListts);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
        <Card
          id="demandeSpecifique"
          shadow="sm"
          padding="lg"
          radius="md"
          w={"100%"}
          withBorder
        >
          <Button onClick={() => handleDemandeSpecifique()} mb={"sm"}>
            Demandes spécifiques
          </Button>
          {demandeSpecifique.length > 0 ? (
            // Display the data when it is available
            <List>
              {demandeSpecifique.map((page: any) => (
                <List.Item key={page.id}>
                  {page.properties.ID.title[0].plain_text}
                </List.Item>
              ))}
            </List>
          ) : (
            // Display a loading state while waiting for data
            <></>
          )}
        </Card>
        <Card
          id="demandeAbandonnee"
          shadow="sm"
          padding="lg"
          radius="md"
          w={"100%"}
          withBorder
        >
          <Button onClick={() => handleDemandeAbandonnee()} mb={"sm"}>
            Demandes Abandonnée
          </Button>
          {demandeAbandonnee.length > 0 ? (
            // Display the data when it is available
            <List>
              {demandeAbandonnee.map((page: any) => (
                <List.Item key={page.id}>
                  {page.properties.ID.title[0].plain_text}
                </List.Item>
              ))}
            </List>
          ) : (
            // Display a loading state while waiting for data
            <></>
          )}
        </Card>
        <Card
          id="devisCommande"
          shadow="sm"
          padding="lg"
          radius="md"
          w={"100%"}
          withBorder
        >
          <Button onClick={() => handleDevisCommande()} mb={"sm"}>
            Devis / Commande
          </Button>
          {devisCommande.length > 0 ? (
            // Display the data when it is available
            <List>
              {devisCommande.map((page: any) => (
                <List.Item key={page.id}>
                  {page.properties.Devis.title[0].plain_text}
                </List.Item>
              ))}
            </List>
          ) : (
            // Display a loading state while waiting for data
            <></>
          )}
        </Card>
      </div>
    </>
  );
};

export default App;
