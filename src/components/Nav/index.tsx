import React from "react";
import Nav from "./style";

interface Props {
  children: React.ReactNode;
  resetStore: () => {};
}

const NavContainer = (props: Props) => {
  return <Nav {...props} />;
};

export default NavContainer;
