import React, { createContext, useState } from "react";

export const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [alarm, setAlarm] = useState("No alarms");

  const [pondInfo, setPondInfo] = useState({
    name: "Tambak A - NTB",
    species: "Vannamei",
    age: 25,
    population: 6000,
    connection: true,
  });

  const [history, setHistory] = useState([]); 

  return (
    <ResultContext.Provider
      value={{
        result,
        setResult,
        inputData,
        setInputData,
        alarm,
        setAlarm,
        pondInfo,
        setPondInfo,
        history,
        setHistory,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};
