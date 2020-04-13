import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Card from "../Card";

interface Props {}

const GET_GAMES = gql`
  query getGames($date: Int!) {
    nba(date: $date)
  }
`;

const NBA = (props: Props) => {
  const { loading, error, data } = useQuery(GET_GAMES, {
    variables: { date: 20190110 },
  });
  console.log("data?", data);

  if (loading) return <div>Loading...</div>;
  else if (error) return <div>error!</div>;
  else if (data) return <Card scores={data.nba.games} />;
};

export default NBA;
