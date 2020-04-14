import React, { useState, useEffect, ReactElement } from "react";
import withAppContext from "../../context/withAppContext";
import { Button, Box, Grid, Text, Heading, CheckBox } from "grommet";
import { User, Login, Logout } from "grommet-icons";
import { Apps } from "grommet-icons";
import AuthButton from "../AuthButton";
import { Link } from "react-router-dom";

import history from "../../utils/history";

interface Props {
  context: {
    isAuth: boolean;
    login: Function;
    logout: Function;
    isDarkMode: boolean;
    setIsDarkMode: Function;
  };
  children: ReactElement[];
}

const NavContainer = (props: Props) => {
  const { context, children } = props;
  const { isAuth, login, logout, isDarkMode, setIsDarkMode } = context;
  const [sidebar, setSidebar] = useState(false);
  return (
    <>
      <Grid
        fill
        rows={["auto", "flex"]}
        columns={["auto", "flex"]}
        areas={[
          { name: "header", start: [0, 0], end: [1, 0] },
          { name: "sidebar", start: [0, 1], end: [0, 1] },
          { name: "main", start: [1, 1], end: [1, 1] },
        ]}
      >
        <Box
          gridArea="header"
          direction="row"
          align="center"
          justify="between"
          pad={{ horizontal: "small", vertical: "small" }}
          background="brand"
        >
          <Box direction="row" gap="large">
            <Apps
              color="light-2"
              onClick={() => setSidebar(!sidebar)}
              size="large"
              style={{ cursor: "pointer" }}
            />
            <Box alignSelf="center">
              <Heading level={3} margin="none" color="light-1">
                <Link style={{ color: "inherit" }} to="/">
                  FeedSubscri.be
                </Link>
              </Heading>
            </Box>
          </Box>

          <AuthButton isAuth={isAuth} login={login} logout={logout} />
        </Box>
        {sidebar && (
          <Box
            gridArea="sidebar"
            background="brand"
            width="xsmall"
            animation={[
              { type: "fadeIn", duration: 300 },
              { type: "slideRight", size: "xlarge", duration: 150 },
            ]}
          >
            <AuthButton isAuth={isAuth} login={login} logout={logout} />
            <Box
              direction="row"
              gap="xsmall"
              justify="center"
              pad={{ horizontal: "medium", vertical: "small" }}
            >
              <CheckBox
                checked={!isDarkMode}
                onChange={(e) => setIsDarkMode(!isDarkMode)}
                toggle
              />
            </Box>
          </Box>
        )}
        <Box gridArea="main">{children}</Box>
      </Grid>
    </>
  );
};

export default withAppContext(NavContainer);
