import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
interface Feed {
  name: String;
  source: String;
}

const ADD_FEED = gql`
  mutation NewFeed($name: String!, $source: String!) {
    createFeed(name: $name, source: $source) {
      name
      source
    }
  }
`;

const GET_FEEDS = gql`
  {
    feeds {
      name
      source
    }
  }
`;

const Feeds = () => {
  const [addFeed, { data }] = useMutation(ADD_FEED);

  const res = useQuery(GET_FEEDS);

  console.log("data?", data);
  return (
    <>
      <button
        onClick={() => {
          addFeed({ variables: { name: "NAME", source: "SOURCE" } });
        }}
      >
        FETCH
      </button>
      {res.loading ? (
        <p>Loading</p>
      ) : res.error ? (
        <div>res.error</div>
      ) : (
        <div>{res.data.feeds.map((feed: Feed) => feed.name)}</div>
      )}
    </>
  );
};

export default Feeds;
