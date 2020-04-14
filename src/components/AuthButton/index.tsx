import React, { ReactNode } from "react";
import { Button, Box, Grid, Text, Heading } from "grommet";
import { User, Login, Logout } from "grommet-icons";
import history from "../../utils/history";

interface Props {
  isAuth: boolean;
  logout: Function;
  login: Function;
}

interface WrapperProps {
  children: ReactNode;
}

const WrapperBox = (props: WrapperProps) => {
  return (
    <Box
      direction="row"
      gap="xsmall"
      justify="center"
      pad={{ horizontal: "medium", vertical: "small" }}
      background="brand"
    >
      {props.children}
    </Box>
  );
};

const AuthButton = (props: Props) => {
  const { isAuth, login, logout } = props;
  console.log("is auth", isAuth);

  if (isAuth) {
    return (
      <Button key={2} onClick={(e) => logout()}>
        <WrapperBox>
          <Logout color="light-1" />
        </WrapperBox>
      </Button>
    );
  } else {
    return (
      <Button key={1} onClick={(e) => login(() => history.push("/"))}>
        <WrapperBox>
          <User color="light-1" />
          <Login color="light-1" />
        </WrapperBox>
      </Button>
    );
  }
};

export default AuthButton;
