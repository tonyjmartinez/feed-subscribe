import React, { ReactNode } from "react";
import { Btn } from "./style";

export interface Props {
  children: ReactNode;
  active?: boolean;
  onClick: Function;
}

const ButtonContainer = (props: Props) => {
  const { onClick, ...rest } = props;
  return <Btn {...rest} onClick={() => onClick()} label={props.children} />;
};

export default ButtonContainer;
