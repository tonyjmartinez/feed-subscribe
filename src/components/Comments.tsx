import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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
  const { loading, error, data } = useQuery(GET_COMMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) console.log("data", data);
  return <p>Something else...</p>;
};

export default Comments;
