import React from "react";
import { Button, Box, Grid, Text, Heading } from "grommet";
import { User, Login, Logout } from "grommet-icons";
import history from "../../utils/history";

interface Props {
  isAuth: boolean;
  logout: Function;
  login: Function;
}

const AuthButton = (props: Props) => {
  const { isAuth, login, logout } = props;
  console.log("is auth", isAuth);

  if (isAuth) {
    return (
      <Button key={2} onClick={(e) => logout()}>
        <Box
          direction="row"
          gap="xsmall"
          justify="center"
          pad={{ horizontal: "medium", vertical: "small" }}
          background="dark-2"
        >
          <Logout />
        </Box>
      </Button>
    );
  } else {
    return (
      <Button key={1} onClick={(e) => login(() => history.push("/"))}>
        <Box
          direction="row"
          gap="xsmall"
          justify="center"
          pad={{ horizontal: "medium", vertical: "small" }}
          background="dark-2"
        >
          <User />
          <Login />
        </Box>
      </Button>
    );
  }
};

export default AuthButton;
