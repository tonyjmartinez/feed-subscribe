import React from "react";
import styled, { CSSObject } from "styled-components";
import * as logos from "react-nba-logos";

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
            <div
              key={home.name}
              className="card"
              style={{ marginBottom: "1em", textAlign: "center" }}
            >
              <div className="card-content">
                <ContentDiv key={visitor.name}>
                  <CardDiv middle width="20%">
                    <VisitorLogo size={35} />
                  </CardDiv>
                  <CardDiv width="60%">{visitor.name}</CardDiv>
                  <CardDiv width="20%">
                    <span>{visitor.score}</span>
                  </CardDiv>
                  <br />
                </ContentDiv>
                <ContentDiv key={home.name}>
                  <CardDiv middle width="20%">
                    <HomeLogo size={35} />
                  </CardDiv>
                  <CardDiv width="60%">{home.name}</CardDiv>
                  <CardDiv width="20%">
                    <span>{home.score}</span>
                  </CardDiv>
                </ContentDiv>
                <GameStateDiv>
                  <span
                    className={`tag ${
                      active ? "is-success" : "is-danger"
                    } is-light`}
                  >
                    {gameState}
                  </span>
                </GameStateDiv>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Card;
