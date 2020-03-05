import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
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
const PRIVATE_ENDPOINT =
  "https://h9gqunf6y7.execute-api.us-west-2.amazonaws.com/dev/api/private";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    handleAuthentication((res: boolean) => {
      history.push("/");
      setIsAuth(res);
    });
  }, []);
  useEffect(() => {
    const callCheckAuth = async () => {
      const authStat = await checkAuthAsync();
      console.log("authstat", authStat);
      if (!authStat) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    };
    setTimeout(() => {
      callCheckAuth();
    }, 100);
  }, []);
  const fetchPrivate = () => {
    const token = localStorage.getItem(ID_TOKEN);
    console.log("token present?", token);
    fetch(PRIVATE_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Token:", data);
        setMessage(data.message);
      })
      .catch(e => {
        console.log("error", e);
        setMessage("error fetching");
      });
  };
  return (
    <div>
      <Router history={history}>
        <Route path="/">
          <button onClick={() => login(() => history.push("/"))}>Login</button>
          <button onClick={() => fetchPrivate()}>Fetch</button>
          <button onClick={() => logout()}>Logout</button>
          <button
            onClick={() => checkAuth((res: boolean) => console.log("res", res))}
          >
            Check
          </button>
          <div>{!isAuth ? "Not authenticated" : "Authenticated"}</div>
          <div>Message: {message}</div>
        </Route>
      </Router>
    </div>
  );
};

export default App;
