import React, { createContext, useState } from "react";

interface IGlobalContext {
  search: string;
  page: string;
  setSearchState: (search: string) => void;
  setPageState: (search: string) => void;
}

const defaultState = {
  search: "",
  page: "",
  setSearchState: (search:string) => {},
  setPageState: (search:string) => {},
};

export const GlobalContext = createContext<IGlobalContext>(defaultState);

export const GlobalProvider = ({ children }:any) => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<string>("search");
    
  //Actions
  const setSearchState = (value:string) => {
    setSearch(value);
  }
  
  const setPageState = (value:string) => {
    console.log(value)
    setPage(value);
  }
  
  return (
    <GlobalContext.Provider
      value={{
        search: search,
        page: page,
        setSearchState,
        setPageState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};