import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IRequestNotionApiResponse } from "../../data/interfaces/IRequestNotionApiResponse";

interface INotionContextProps {
  children: React.ReactNode;
}

const defaultValue: IRequestNotionApiResponse = {
  type: "",
  length: 0,
  period: {
    start: "00/00/0000",
    end: "00/00/0000",
  },
};

export const AllPagesDevisCommandeContext =
  createContext<IRequestNotionApiResponse>(defaultValue);
export const AllPagesDevisCommandeUpdateContext = createContext<
  Dispatch<SetStateAction<IRequestNotionApiResponse>>
>(() => {});

const AllPagesDevisCommandeContextProvider = (props: INotionContextProps) => {
  const [notionData, setNotionData] =
    useState<IRequestNotionApiResponse>(defaultValue);

  useEffect(() => {
    const handleDevisCommande = () => {
      fetch("http://localhost:3000/api/devisCommande")
        .then((response) => response.json())
        .then((data) => {
          setNotionData(data);
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
    <AllPagesDevisCommandeContext.Provider value={notionData}>
      <AllPagesDevisCommandeUpdateContext.Provider value={setNotionData}>
        {props.children}
      </AllPagesDevisCommandeUpdateContext.Provider>
    </AllPagesDevisCommandeContext.Provider>
  );
};

export default AllPagesDevisCommandeContextProvider;
