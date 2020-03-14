import React from "react";
import { AppContext } from "./AppContext";

const withAppContext = (Component: React.ElementType) => {
  const WrapperComponent: React.FunctionComponent<any> = props => {
    return (
      <AppContext.Consumer>
        {context => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  };
  return WrapperComponent;
};

export default withAppContext;
