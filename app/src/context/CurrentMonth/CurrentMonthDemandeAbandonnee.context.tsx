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

export const CurrentMonthDemandeAbandonneeContext =
  createContext<IRequestNotionApiResponse>(defaultValue);

export const CurrentMonthDemandeAbandonneeUpdateContext = createContext<
  Dispatch<SetStateAction<IRequestNotionApiResponse>>
>(() => {});

const CurrentMonthDemandeAbandonneeContextProvider = (
  props: INotionContextProps
) => {
  const [notionData, setNotionData] =
    useState<IRequestNotionApiResponse>(defaultValue);

  useEffect(() => {
    const handleDemandeAbandonnee = () => {
      fetch("http://localhost:3000/api/demandeAbandonnee/currentMonth/0")
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
    <CurrentMonthDemandeAbandonneeContext.Provider value={notionData}>
      <CurrentMonthDemandeAbandonneeUpdateContext.Provider value={setNotionData}>
        {props.children}
      </CurrentMonthDemandeAbandonneeUpdateContext.Provider>
    </CurrentMonthDemandeAbandonneeContext.Provider>
  );
};

export default CurrentMonthDemandeAbandonneeContextProvider;
