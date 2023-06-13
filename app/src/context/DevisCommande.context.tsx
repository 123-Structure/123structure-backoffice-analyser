import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const DevisCommandeContext = createContext<[]>([]);
export const DevisCommandeUpdateContext = createContext<
  Dispatch<SetStateAction<[]>>
>(() => []);

interface INotionContextProps {
  children: React.ReactNode;
}

const DevisCommandeContextProvider = (props: INotionContextProps) => {
  const [notionData, setNotionData] = useState<[]>([]);

  useEffect(() => {
    const handleDevisCommande = () => {
      fetch("http://localhost:3000/api/devisCommande")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setNotionData(data.results);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    return () => {
      handleDevisCommande();
    };
  }, []);

  return (
    <DevisCommandeContext.Provider value={notionData}>
      <DevisCommandeUpdateContext.Provider value={setNotionData}>
        {props.children}
      </DevisCommandeUpdateContext.Provider>
    </DevisCommandeContext.Provider>
  );
};

export default DevisCommandeContextProvider;
