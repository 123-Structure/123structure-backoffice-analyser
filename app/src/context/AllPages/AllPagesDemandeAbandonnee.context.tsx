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

const defaultValue:IRequestNotionApiResponse = {
  type: "",
  length: 0,
  period: {
    start: "00/00/0000",
    end: "00/00/0000",
  },
};

export const AllPagesDemandeAbandonneeContext =
  createContext<IRequestNotionApiResponse>(defaultValue);

export const AllPagesDemandeAbandonneeUpdateContext = createContext<
  Dispatch<SetStateAction<IRequestNotionApiResponse>>
>(() => {});

const AllPagesDemandeAbandonneeContextProvider = (
  props: INotionContextProps
) => {
  const [notionData, setNotionData] =
    useState<IRequestNotionApiResponse>(defaultValue);

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
