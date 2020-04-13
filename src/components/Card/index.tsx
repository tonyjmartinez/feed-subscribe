import React from "react";
import styled, { CSSObject } from "styled-components";

interface DivProps {
  readonly middle?: Boolean;
  readonly width?: String;
}

const CardDiv = styled.div<DivProps>`
  width: 20%;
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
  width: 100%;
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
          return (
            <div
              key={home.name}
              className="card"
              style={{ marginBottom: "1em" }}
            >
              <div className="card-content">
                <ContentDiv key={visitor.name}>
                  <CardDiv middle width="10%">
                    {visitor.logo}
                  </CardDiv>
                  <CardDiv width={`80%`}>{visitor.name}</CardDiv>
                  <CardDiv width="10%">
                    <span>{visitor.score}</span>
                  </CardDiv>
                  <br />
                </ContentDiv>
                <ContentDiv key={home.name}>
                  <CardDiv middle width="10%">
                    {home.logo}
                  </CardDiv>
                  <CardDiv width="80%">{home.name}</CardDiv>
                  <CardDiv width="10%">
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
