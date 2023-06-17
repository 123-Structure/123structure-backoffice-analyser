import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IGetAllPagesResponse } from "../../data/interfaces/IGetAllPagesResponse";

interface INotionContextProps {
  children: React.ReactNode;
}

const defaultValue: IGetAllPagesResponse = {
  type: "",
  length: -1,
};

export const AllPagesDevisCommandeContext =
  createContext<IGetAllPagesResponse>(defaultValue);
export const AllPagesDevisCommandeUpdateContext = createContext<
  Dispatch<SetStateAction<IGetAllPagesResponse>>
>(() => {});

const AllPagesDevisCommandeContextProvider = (props: INotionContextProps) => {
  const [notionData, setNotionData] =
    useState<IGetAllPagesResponse>(defaultValue);

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
