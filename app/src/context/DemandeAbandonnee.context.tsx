import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const DemandeAbandonneeContext = createContext<[]>([]);
export const DemandeAbandonneeUpdateContext = createContext<
  Dispatch<SetStateAction<[]>>
>(() => []);

interface INotionContextProps {
  children: React.ReactNode;
}

const DemandeAbandonneeContextProvider = (props: INotionContextProps) => {
  const [notionData, setNotionData] = useState<[]>([]);

  useEffect(() => {
    const handleDemandeAbandonnee = () => {
      fetch("http://localhost:3000/api/demandeAbandonnee")
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
      handleDemandeAbandonnee();
    };
  }, []);

  return (
    <DemandeAbandonneeContext.Provider value={notionData}>
      <DemandeAbandonneeUpdateContext.Provider value={setNotionData}>
        {props.children}
      </DemandeAbandonneeUpdateContext.Provider>
    </DemandeAbandonneeContext.Provider>
  );
};

export default DemandeAbandonneeContextProvider;
