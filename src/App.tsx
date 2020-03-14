import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import AppProvider from "./context/AppProvider";
import { Button } from "antd";
import Comments from "./components/Comments";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
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
import { OmitProps } from "antd/lib/transfer/renderListBody";

const httpLink = createHttpLink({
  // uri: "https://0edpiwx4nd.execute-api.us-east-1.amazonaws.com/dev/api/graphql"
  uri: "https://api.feedsubscri.be/dev/api/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(ID_TOKEN);
  // return the headers to the context so httpLink can read them
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

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <Router history={history}>
          <Route path="/">
            <Nav
              resetStore={client.resetStore}
              isAuth={isAuth}
              setIsAuth={(a: boolean) => setIsAuth(a)}
            >
              <Comments />
            </Nav>
          </Route>
        </Router>
      </AppProvider>
    </ApolloProvider>
  );
};

export default App;
