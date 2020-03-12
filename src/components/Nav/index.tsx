import React from "react";
import Nav from "./style";

interface Props {
  children: React.ReactNode;
  resetStore: () => {};
  isAuth: boolean;
  setIsAuth: (a: boolean) => void;
}

const NavContainer = (props: Props) => {
  return <Nav {...props} />;
};

export default NavContainer;
