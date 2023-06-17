import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IGetCurrentMonthResponse } from "../../data/interfaces/IGetCurrentMonth";

interface INotionContextProps {
  children: React.ReactNode;
}

const defaultValue: IGetCurrentMonthResponse = {
  type: "",
  length: -1,
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
  createContext<IGetCurrentMonthResponse>(defaultValue);

export const CurrentMonthDemandeAbandonneeUpdateContext = createContext<
  Dispatch<SetStateAction<IGetCurrentMonthResponse>>
>(() => {});

const CurrentMonthDemandeAbandonneeContextProvider = (
  props: INotionContextProps
) => {
  const [notionData, setNotionData] =
    useState<IGetCurrentMonthResponse>(defaultValue);

  useEffect(() => {
    const handleDemandeAbandonnee = () => {
      fetch(
        `http://localhost:3000/api/demandeAbandonnee/currentMonth/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}`
      )
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
      <CurrentMonthDemandeAbandonneeUpdateContext.Provider
        value={setNotionData}
      >
        {props.children}
      </CurrentMonthDemandeAbandonneeUpdateContext.Provider>
    </CurrentMonthDemandeAbandonneeContext.Provider>
  );
};

export default CurrentMonthDemandeAbandonneeContextProvider;
