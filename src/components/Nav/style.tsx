import React, { useState, useEffect } from "react";
import withAppContext from "../../context/withAppContext";

import { Button } from "antd";
import history from "../../utils/history";

interface Props {
  context: {
    isAuth: boolean;
    login: Function;
    logout: Function;
  };
}

const Nav = (props: Props) => {
  const { context } = props;
  const { isAuth, login, logout } = context;
  return (
    <>
      <div>NAVBAR</div>

      <Button onClick={() => login(() => history.push("/"))}>Login</Button>
      <Button onClick={() => logout()}>Logout</Button>

      <div>{!isAuth ? "Not authenticated" : "Authenticated"}</div>
    </>
  );
};

export default withAppContext(Nav);
