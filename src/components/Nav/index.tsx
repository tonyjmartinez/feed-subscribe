import React, { useState, useEffect } from "react";
import Button from "../Button";
import withAppContext from "../../context/withAppContext";
import { Nav, Anchor, CheckBox } from "grommet";
import { Home, Notification, ChatOption, Login, Logout } from "grommet-icons";

import history from "../../utils/history";

interface Props {
  context: {
    isAuth: boolean;
    login: Function;
    logout: Function;
    isDarkMode: boolean;
    setIsDarkMode: Function;
  };
}

const NavContainer = (props: Props) => {
  const { context } = props;
  const { isAuth, login, logout, isDarkMode, setIsDarkMode } = context;
  return (
    <>
      <Nav direction="row" background="brand" pad="small">
        {isAuth ? (
          <Anchor icon={<Logout />} onClick={e => logout()} />
        ) : (
          <Anchor
            icon={<Login />}
            onClick={e => login(() => history.push("/"))}
          />
        )}
        <Anchor href="/comments" label="Comments" />
        <CheckBox
          toggle
          checked={isDarkMode}
          onChange={e => setIsDarkMode(!isDarkMode)}
        />
      </Nav>

      <Button active onClick={() => login(() => history.push("/"))}>
        Login
      </Button>
      <Button onClick={() => logout()}>Logout</Button>
      <Button onClick={() => setIsDarkMode(!isDarkMode)}>DARK TOGGLE</Button>

      <div>{!isAuth ? "Not authenticated" : "Authenticated"}</div>
    </>
  );
};

export default withAppContext(NavContainer);
