import React, { useState, ReactNode, PropsWithChildren } from "react";
import { AppContext } from "./AppContext";
import useDarkMode from "../hooks/useDarkMode";

export interface Props {
  children: ReactNode;
}

export interface Creds {
  email: string;
  password: string;
  username: string;
}

const AppProvider = (props: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <AppContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isDarkMode,
        setIsDarkMode
        // isAuth: authorized,
        // signin: attemptLogin,
        // setDarkMode,
        // darkMode,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
