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

export const AllPagesDemandeSpecifiqueContext =
  createContext<IRequestNotionApiResponse>(defaultValue);

export const AllPagesDemandeSpecifiqueUpdateContext = createContext<
  Dispatch<SetStateAction<IRequestNotionApiResponse>>
>(() => {});

const AllPagesDemandeSpecifiqueContextProvider = (
  props: INotionContextProps
) => {
  const [notionData, setNotionData] =
    useState<IRequestNotionApiResponse>(defaultValue);

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
    <AllPagesDemandeSpecifiqueContext.Provider value={notionData}>
      <AllPagesDemandeSpecifiqueUpdateContext.Provider value={setNotionData}>
        {props.children}
      </AllPagesDemandeSpecifiqueUpdateContext.Provider>
    </AllPagesDemandeSpecifiqueContext.Provider>
  );
};

export default AllPagesDemandeSpecifiqueContextProvider;
