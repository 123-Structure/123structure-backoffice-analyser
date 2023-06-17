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

export const CurrentMonthDemandeSpecifiqueContext =
  createContext<IGetCurrentMonthResponse>(defaultValue);

export const CurrentMonthDemandeSpecifiqueUpdateContext = createContext<
  Dispatch<SetStateAction<IGetCurrentMonthResponse>>
>(() => {});

const CurrentMonthDemandeSpecifiqueContextProvider = (
  props: INotionContextProps
) => {
  const [notionData, setNotionData] =
    useState<IGetCurrentMonthResponse>(defaultValue);

  useEffect(() => {
    const handleDemandeSpecifique = () => {
      fetch(
        `http://localhost:3000/api/demandeSpecifique/currentMonth/${
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
      handleDemandeSpecifique();
    };
  }, []);

  return (
    <CurrentMonthDemandeSpecifiqueContext.Provider value={notionData}>
      <CurrentMonthDemandeSpecifiqueUpdateContext.Provider
        value={setNotionData}
      >
        {props.children}
      </CurrentMonthDemandeSpecifiqueUpdateContext.Provider>
    </CurrentMonthDemandeSpecifiqueContext.Provider>
  );
};

export default CurrentMonthDemandeSpecifiqueContextProvider;
