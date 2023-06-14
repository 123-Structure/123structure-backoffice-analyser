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
  difference: {
    period: {
      start: "00/00/0000",
      end: "00/00/0000",
    },
    value: 0,
    percent: 0,
  },
};

export const CurrentMonthDemandeSpecifiqueContext =
  createContext<IRequestNotionApiResponse>(defaultValue);

export const CurrentMonthDemandeSpecifiqueUpdateContext = createContext<
  Dispatch<SetStateAction<IRequestNotionApiResponse>>
>(() => {});

const CurrentMonthDemandeSpecifiqueContextProvider = (
  props: INotionContextProps
) => {
  const [notionData, setNotionData] =
    useState<IRequestNotionApiResponse>(defaultValue);

  useEffect(() => {
    const handleDemandeSpecifique = () => {
      fetch("http://localhost:3000/api/demandeSpecifique/currentMonth/0")
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
    <CurrentMonthDemandeSpecifiqueContext.Provider value={notionData}>
      <CurrentMonthDemandeSpecifiqueUpdateContext.Provider value={setNotionData}>
        {props.children}
      </CurrentMonthDemandeSpecifiqueUpdateContext.Provider>
    </CurrentMonthDemandeSpecifiqueContext.Provider>
  );
};

export default CurrentMonthDemandeSpecifiqueContextProvider;
