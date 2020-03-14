import React from "react";

export interface AppCtxInterface {
  isAuth: boolean;
  setIsAuth: Function;
  isDarkMode: boolean;
  setIsDarkMode: Function;
}

interface IContext {
  isAuth: boolean;
  setIsAuth: Function;
  isDarkMode: boolean;
  setIsDarkMode: Function;
  login: Function;
  logout: Function;
}

export const AppContext = React.createContext({} as IContext);
