import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import styled from "styled-components";
import { Box, Button } from "grommet";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import withThemeContext from "../../context/withThemeContext";
import { compose } from "rambda";
import withAppContext from "../../context/withAppContext";
import NBA from "../Feeds/NBA";
const globalAny: any = global;

interface GridBoxProps {
  color: any;
}
const GridBox = styled.div<GridBoxProps>`
  background-color: ${(props) => props.color};
  border-radius: 0.5em;
  overflow: scroll;
`;

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

interface Props {
  theme: any;
  context: {
    isDarkMode: boolean;
    isAuth: boolean;
  };
}

const ResponsiveLocalStorageLayout = (props: Props) => {
  console.log("props", props);
  console.log("brand", props.theme.global.colors.brand);
  const colors = props.theme.global.colors;
  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );

  const resetLayout = () => {
    setLayouts({});
  };

  const onLayoutChange = (layouts: object) => {
    saveToLS("layouts", layouts);
    setLayouts(layouts);
  };

  return (
    <Box
      direction="column"
      border={{ color: "brand", size: "large" }}
      pad="medium"
    >
      <Button style={{ width: "10%" }} primary onClick={() => resetLayout()}>
        Reset Layout
      </Button>
      <ResponsiveReactGridLayout
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={20}
        compactType="vertical"
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layouts)}
        style={{ position: "relative" }}
        isDraggable={false}
      >
        <GridBox
          key="1"
          data-grid={{ w: 2, h: 8, x: 0, y: 0, minW: 2, minH: 3 }}
          color={
            props.context.isDarkMode ? colors.brand.dark : colors.brand.light
          }
        >
          {props.context.isAuth && <NBA />}
        </GridBox>
        {/* <GridBox
          key="2"
          data-grid={{ w: 2, h: 8, x: 2, y: 0, minW: 2, minH: 3 }}
        >
          <span className="text">2</span>
        </GridBox>
        <GridBox
          key="3"
          data-grid={{ w: 2, h: 8, x: 4, y: 0, minW: 2, minH: 3 }}
        >
          <span className="text">3</span>
        </GridBox>
        <GridBox
          key="4"
          data-grid={{ w: 2, h: 8, x: 6, y: 0, minW: 2, minH: 3 }}
        >
          <span className="text">4</span>
        </GridBox>
        <GridBox
          key="5"
          data-grid={{ w: 2, h: 8, x: 8, y: 0, minW: 2, minH: 3 }}
        >
          <span className="text">5</span>
        </GridBox> */}
      </ResponsiveReactGridLayout>
    </Box>
  );
};

function getFromLS(key: any) {
  let ls: any = {};
  if (globalAny.localStorage) {
    try {
      ls = JSON.parse(globalAny.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key: any, value: any) {
  if (globalAny.localStorage) {
    globalAny.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}

export default compose(
  withThemeContext,
  withAppContext
)(ResponsiveLocalStorageLayout);
