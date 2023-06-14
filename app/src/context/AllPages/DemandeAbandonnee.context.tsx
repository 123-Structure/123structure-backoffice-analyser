import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IGetAllPages } from "../../data/interfaces/IGetAllPages";

interface INotionContextProps {
  children: React.ReactNode;
}

export const DemandeAbandonneeContext = createContext<IGetAllPages>({
  type: "",
  length: 0,
  period: {
    start: "00/00/0000",
    end: "00/00/0000",
  },
});
export const DemandeAbandonneeUpdateContext = createContext<
  Dispatch<SetStateAction<IGetAllPages>>
>(() => {});

const DemandeAbandonneeContextProvider = (props: INotionContextProps) => {
  const [notionData, setNotionData] = useState<IGetAllPages>({
    type: "",
    length: 0,
    period: {
      start: "00/00/0000",
      end: "00/00/0000",
    },
  });

  useEffect(() => {
    const handleDemandeAbandonnee = () => {
      fetch("http://localhost:3000/api/demandeAbandonnee")
        .then((response) => response.json())
        .then((data) => {
          setNotionData(data);
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
