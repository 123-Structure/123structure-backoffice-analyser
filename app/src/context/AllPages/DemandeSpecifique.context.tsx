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

export const DemandeSpecifiqueContext = createContext<IGetAllPages>({
  type: "",
  length: 0,
  period: {
    start: "00/00/0000",
    end: "00/00/0000",
  },
});
export const DemandeSpecifiqueUpdateContext = createContext<
  Dispatch<SetStateAction<IGetAllPages>>
>(() => {});

const DemandeSpecifiqueContextProvider = (props: INotionContextProps) => {
  const [notionData, setNotionData] = useState<IGetAllPages>({
    type: "",
    length: 0,
    period: {
      start: "00/00/0000",
      end: "00/00/0000",
    },
  });

  useEffect(() => {
    const handleDemandeSpecifique = () => {
      fetch("http://localhost:3000/api/demandeSpecifique")
        .then((response) => response.json())
        .then((data) => {
          setNotionData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    return () => {
      handleDemandeSpecifique();
    };
  }, []);

  return (
    <DemandeSpecifiqueContext.Provider value={notionData}>
      <DemandeSpecifiqueUpdateContext.Provider value={setNotionData}>
        {props.children}
      </DemandeSpecifiqueUpdateContext.Provider>
    </DemandeSpecifiqueContext.Provider>
  );
};

export default DemandeSpecifiqueContextProvider;
