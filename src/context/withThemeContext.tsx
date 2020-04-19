import React from "react";
import { ThemeContext } from "grommet";

const withThemeContext = (Component: React.ElementType) => {
  const WrapperComponent: React.FunctionComponent<any> = (props) => {
    return (
      <ThemeContext.Consumer>
        {(theme) => <Component {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  };
  return WrapperComponent;
};

export default withThemeContext;
