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

const defaultValue: IGetCurrentMonthResponse[] = [
  {
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
  },
];

export const CurrentMonthByCategoryDemandeAbandonneeContext =
  createContext<IGetCurrentMonthResponse[]>(defaultValue);

export const CurrentMonthByCategoryDemandeAbandonneeUpdateContext =
  createContext<Dispatch<SetStateAction<IGetCurrentMonthResponse[]>>>(() => {});

const CurrentMonthByCategoryDemandeAbandonneeContextProvider = (
  props: INotionContextProps
) => {
  const [notionData, setNotionData] =
    useState<IGetCurrentMonthResponse[]>(defaultValue);

  useEffect(() => {
    const handleDemandeAbandonnee = () => {
      fetch(
        `http://localhost:3000/api/demandeAbandonnee/currentMonthByCategory/${
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
    <CurrentMonthByCategoryDemandeAbandonneeContext.Provider value={notionData}>
      <CurrentMonthByCategoryDemandeAbandonneeUpdateContext.Provider
        value={setNotionData}
      >
        {props.children}
      </CurrentMonthByCategoryDemandeAbandonneeUpdateContext.Provider>
    </CurrentMonthByCategoryDemandeAbandonneeContext.Provider>
  );
};

export default CurrentMonthByCategoryDemandeAbandonneeContextProvider;
