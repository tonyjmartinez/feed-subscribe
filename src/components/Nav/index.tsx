import React, { useState, useEffect, ReactElement } from "react";
import withAppContext from "../../context/withAppContext";
import {
  Nav,
  Button,
  Anchor,
  CheckBox,
  Box,
  Grid,
  Text,
  Heading,
} from "grommet";
import {
  Home,
  User,
  Notification,
  ChatOption,
  Login,
  Logout,
} from "grommet-icons";
import Comments from "../Comments";
import { Apps } from "grommet-icons";

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
          background="dark-2"
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
                FeedSubscri.be
              </Heading>
            </Box>
          </Box>

          {/* <Button >
            <Text size="large">Title</Text>
          </Button> */}
          <Text>my@email</Text>
        </Box>
        {sidebar && (
          <Box
            gridArea="sidebar"
            background="dark-3"
            width="xsmall"
            animation={[
              { type: "fadeIn", duration: 300 },
              { type: "slideRight", size: "xlarge", duration: 150 },
            ]}
          >
            {isAuth ? (
              <Button key={2} onClick={(e) => logout()}>
                <Box
                  direction="row"
                  gap="xsmall"
                  justify="center"
                  pad={{ horizontal: "medium", vertical: "small" }}
                  background="brand"
                >
                  <User />
                  <Logout />
                </Box>
              </Button>
            ) : (
              <Button key={1} onClick={(e) => login(() => history.push("/"))}>
                <Box
                  direction="row"
                  gap="xsmall"
                  justify="center"
                  pad={{ horizontal: "medium", vertical: "small" }}
                  background="brand"
                >
                  <User />
                  <Login />
                </Box>
              </Button>
            )}
            <Button primary onClick={(e) => setIsDarkMode(!isDarkMode)}>
              DARK TOGGLE
            </Button>
          </Box>
        )}
        <Box gridArea="main">
          {children}
          {/* <Text>main</Text>
          <Text>{!isAuth ? "Not authenticated" : "Authenticated"}</Text>
          <Text>{isAuth ? <Comments /> : null}</Text>
          <Button primary onClick={e => setIsDarkMode(!isDarkMode)}>
            DARK TOGGLE
          </Button> */}
        </Box>
      </Grid>
    </>
  );
};

export default withAppContext(NavContainer);
