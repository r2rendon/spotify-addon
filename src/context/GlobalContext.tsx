import React, { createContext, useState } from "react";

interface IGlobalContext {
  search: string;
  setSearchState?: (search: string) => void;
}

const defaultState = {
  search: "",
};

export const GlobalContext = createContext<IGlobalContext>(defaultState);

export const GlobalProvider = ({ children }:any) => {
  const [search, setSearch] = useState<string>("");
    
  //Actions
  const setSearchState = (search:string) => {
    setSearch(search);
  }
  
  return (
    <GlobalContext.Provider
      value={{
        search: search,
        setSearchState
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};