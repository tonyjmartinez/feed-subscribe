import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { Button } from "grommet";
import AppProvider from "./context/AppProvider";
import withAppContext from "./context/withAppContext";
import Comments from "./components/Comments";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import PrivateRoute from "./components/hoc/PrivateRoute";
import GromProvider from "./context/GromProvider";
import { ApolloProvider } from "@apollo/react-hooks";
import Grid from "./components/Grid/index";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  handleAuthentication,
  checkAuth,
  login,
  logout,
  EXPIRES_IN,
  ID_TOKEN,
  ACCESS_TOKEN,
  checkAuthAsync
} from "./utils/auth0-helper";
import { Router, Switch, Route, Link, useHistory } from "react-router-dom";
import history from "./utils/history";

const httpLink = createHttpLink({
  // uri: "https://0edpiwx4nd.execute-api.us-east-1.amazonaws.com/dev/api/graphql"
  uri: "https://api.feedsubscri.be/dev/api/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  const token = localStorage.getItem(ID_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

interface Props {
  context: {
    isAuth: boolean;
    setIsDarkMode: Function;
    isDarkMode: boolean;
  };
}

const App = (props: Props) => {
  const { context } = props;
  const { isDarkMode, setIsDarkMode } = context;
  return (
    <ApolloProvider client={client}>
      <AppProvider resetStore={client.resetStore}>
        <GromProvider>
          <Nav>
            <Router history={history}>
              <Route exact path="/">
                <Grid />
              </Route>
              <PrivateRoute
                path="/comments"
                component={Comments}
              ></PrivateRoute>
            </Router>
          </Nav>
        </GromProvider>
      </AppProvider>
    </ApolloProvider>
  );
};

export default withAppContext(App);
