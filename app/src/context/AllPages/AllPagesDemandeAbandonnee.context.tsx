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
  length: 0,
};

export const AllPagesDemandeAbandonneeContext =
  createContext<IGetAllPagesResponse>(defaultValue);

export const AllPagesDemandeAbandonneeUpdateContext = createContext<
  Dispatch<SetStateAction<IGetAllPagesResponse>>
>(() => {});

const AllPagesDemandeAbandonneeContextProvider = (
  props: INotionContextProps
) => {
  const [notionData, setNotionData] =
    useState<IGetAllPagesResponse>(defaultValue);

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
    <AllPagesDemandeAbandonneeContext.Provider value={notionData}>
      <AllPagesDemandeAbandonneeUpdateContext.Provider value={setNotionData}>
        {props.children}
      </AllPagesDemandeAbandonneeUpdateContext.Provider>
    </AllPagesDemandeAbandonneeContext.Provider>
  );
};

export default AllPagesDemandeAbandonneeContextProvider;
