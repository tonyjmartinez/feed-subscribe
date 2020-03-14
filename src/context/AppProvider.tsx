import React, { useState, ReactNode, useEffect } from "react";
import { AppContext } from "./AppContext";
import useDarkMode from "../hooks/useDarkMode";
import {
  handleAuthentication,
  checkAuth,
  login,
  logout,
  checkAuthAsync
} from "../utils/auth0-helper";
import history from "../utils/history";
export interface Props {
  children: ReactNode;
  resetStore: Function;
}

const AppProvider = (props: Props) => {
  const { resetStore } = props;
  const [isAuth, setIsAuth] = useState(false);
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  useEffect(() => {
    handleAuthentication((res: boolean) => {
      resetStore();

      history.push("/");
      setIsAuth(res);
    });
  }, []);
  useEffect(() => {
    const callCheckAuth = async () => {
      const authStat = await checkAuthAsync();
      console.log("authstat", authStat);
      if (!authStat) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    };
    setTimeout(() => {
      callCheckAuth();
    }, 100);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isDarkMode,
        setIsDarkMode,
        login,
        logout
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
