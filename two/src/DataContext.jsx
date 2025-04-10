import React from "react";
import { createContext } from "react";

export const DataContextAPI = createContext();

export const DataProvider = ({ children }) => {
  const name = "Tamim";
  return (
    <DataContextAPI.Provider value={name}>{children}</DataContextAPI.Provider>
  );
};
