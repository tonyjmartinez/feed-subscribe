import React, { useState } from "react";
import styled, { CSSObject } from "styled-components";
import * as logos from "react-nba-logos";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
  Text,
  InfiniteScroll,
} from "grommet";

interface DivProps {
  readonly middle?: Boolean;
  readonly width?: String;
}

const CardDiv = styled.div<DivProps>`
  display: inline-block;
  text-align: center;
  vertical-align: ${(props) => (props.middle ? "middle" : "baseline")};
  width: ${(props) => props.width as any};
`;

const ContentDiv = styled.div`
  height: 35px;
  margin-bottom: 1em;
`;

const GameStateDiv = styled.div`
  text-align: center;
`;

interface CardProps {
  scores: any;
  cardStyle?: any;
}

interface ScoreType {
  home: any;
  visitor: any;
  gameState: any;
  active: any;
}

const Card = (props: CardProps) => {
  const { scores, cardStyle } = props;
  const step = 25;
  const [results, setResults] = useState(
    Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000000))
  );
  const load = () => {
    console.log(`InfiniteScroll fires onMore after loading ${step} items`);
    setResults([
      ...results,
      ...Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000000)),
    ]);
  };
  return (
    <div style={cardStyle}>
      {scores &&
        scores.map((score: ScoreType) => {
          const { home, visitor, gameState, active } = score;
          const logo: any = logos;
          const HomeLogo = logo[home.triCode];

          const VisitorLogo = logo[visitor.triCode];
          console.log("logos", logos);
          console.log("home visitor", home, visitor);
          return (
            <Table>
              <TableBody>
                <InfiniteScroll
                  renderMarker={(marker) => (
                    <TableRow>
                      <TableCell>{marker}</TableCell>
                    </TableRow>
                  )}
                  scrollableAncestor="window"
                  items={results}
                  onMore={() => load()}
                  step={step}
                >
                  {(result) => (
                    <TableRow key={result}>
                      <TableCell>{result}</TableCell>
                      <TableCell>cartoon</TableCell>
                      <TableCell>movie name</TableCell>
                      <TableCell>year</TableCell>
                    </TableRow>
                  )}
                </InfiniteScroll>
              </TableBody>
            </Table>
          );
          // return (
          //   <Table style={{ width: "100%" }}>
          //     <TableBody>
          //       <TableRow>
          //         <TableCell scope="row" align="center">
          //           <VisitorLogo size={35} />
          //         </TableCell>
          //         <TableCell scope="row" align="center">
          //           {visitor.score}
          //         </TableCell>
          //       </TableRow>
          //       <TableRow>
          //         <TableCell scope="row" align="center">
          //           <HomeLogo size={35} />
          //         </TableCell>
          //         <TableCell scope="row" align="center">
          //           <Text>{home.score}</Text>
          //         </TableCell>
          //       </TableRow>
          //     </TableBody>
          //     <TableFooter>
          //       <TableRow>
          //         <TableCell border="top" align="center">
          //           <Text>{gameState}</Text>
          //         </TableCell>
          //       </TableRow>
          //     </TableFooter>
          //   </Table>
          // );

          // return (
          //   <div
          //     key={home.name}
          //     className="card"
          //     style={{ marginBottom: "1em", textAlign: "center" }}
          //   >
          //     <div className="card-content">
          //       <ContentDiv key={visitor.name}>
          //         <CardDiv middle width="20%">
          //           <VisitorLogo size={35} />
          //         </CardDiv>
          //         <CardDiv width="60%">{visitor.name}</CardDiv>
          //         <CardDiv width="20%">
          //           <span>{visitor.score}</span>
          //         </CardDiv>
          //         <br />
          //       </ContentDiv>
          //       <ContentDiv key={home.name}>
          //         <CardDiv middle width="20%">
          //           <HomeLogo size={35} />
          //         </CardDiv>
          //         <CardDiv width="60%">{home.name}</CardDiv>
          //         <CardDiv width="20%">
          //           <span>{home.score}</span>
          //         </CardDiv>
          //       </ContentDiv>
          //       <GameStateDiv>
          //         <span
          //           className={`tag ${
          //             active ? "is-success" : "is-danger"
          //           } is-light`}
          //         >
          //           {gameState}
          //         </span>
          //       </GameStateDiv>
          //     </div>
          //   </div>
          // );
        })}
    </div>
  );
};

export default Card;
