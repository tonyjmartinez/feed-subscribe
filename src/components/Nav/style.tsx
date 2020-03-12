import React, { useState, useEffect } from "react";

import {
  handleAuthentication,
  checkAuth,
  login,
  logout,
  EXPIRES_IN,
  ID_TOKEN,
  ACCESS_TOKEN,
  checkAuthAsync
} from "../../utils/auth0-helper";
import { Button } from "antd";
import { Router, Switch, Route, Link, useHistory } from "react-router-dom";
import history from "../../utils/history";

const PRIVATE_ENDPOINT =
  "https://h9gqunf6y7.execute-api.us-west-2.amazonaws.com/dev/api/private";

const PUBLIC_ENDPOINT =
  "https://94lakymul3.execute-api.us-west-2.amazonaws.com/dev/api/public";

interface Props {
  children: React.ReactNode;
  resetStore: () => {};
  isAuth: boolean;
  setIsAuth: (a: boolean) => void;
}

const Nav = (props: Props) => {
  const { children, resetStore, isAuth, setIsAuth } = props;
  console.log("nav props", props);

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
    <>
      <div>NAVBAR</div>

      <Button onClick={() => login(() => history.push("/"))}>Login</Button>
      <Button onClick={() => logout()}>Logout</Button>
      <Button
        onClick={() => checkAuth((res: boolean) => console.log("res", res))}
      >
        Check
      </Button>
      <div>{!isAuth ? "Not authenticated" : "Authenticated"}</div>
      {isAuth ? children : null}
    </>
  );
};

export default Nav;
