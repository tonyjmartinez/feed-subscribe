import React from "react";
import { Route, Redirect } from "react-router-dom";
import withAppContext from "../../context/withAppContext";

interface Props {
  Component: React.ElementType;
  context: {
    isAuth: boolean;
  };
}

const PrivateRoute = (props: Props) => {
  const { context, Component, ...rest } = props;
  const { isAuth } = context;
  return (
    <Route
      {...rest}
      render={props =>
        isAuth === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default withAppContext(PrivateRoute);
