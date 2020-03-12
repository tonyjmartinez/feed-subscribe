import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import {
  handleAuthentication,
  checkAuth,
  login,
  logout,
  EXPIRES_IN,
  ID_TOKEN,
  ACCESS_TOKEN,
  checkAuthAsync
} from "../utils/auth0-helper";

const GET_COMMENTS = gql`
  {
    comments {
      content
      userId
      commentId
    }
  }
`;

const Comments = () => {
  const [attemptedReset, setAttemptedReset] = useState(false);
  const { loading, error, data, client } = useQuery(GET_COMMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    // console.log(error);
    // if (localStorage.getItem(ID_TOKEN)) {
    //   try {
    //     client.resetStore();
    //   } catch (err) {
    //     console.log(error);
    //   }
    // }
    // if (!attemptedReset) {
    //   setAttemptedReset(true);
    //   client.resetStore();
    // }
    return <div>Error..</div>;
  }
  // return (
  //   <>
  //     <p>Error :(</p>
  //     <button onClick={() => client.resetStore()}>Reset store</button>
  //   </>
  // );
  if (data) console.log("data", data);
  return <p>Something else...</p>;
};

export default Comments;