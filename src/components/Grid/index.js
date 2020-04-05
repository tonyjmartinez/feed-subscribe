import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import styled from "styled-components";
import { Box, Button } from "grommet";

const GridBox = styled.div`
  background-color: orange;
  border-radius: 0.5em;
`;

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

const ResponsiveLocalStorageLayout = (props) => {
  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );

  const resetLayout = () => {
    setLayouts({});
  };

  const onLayoutChange = (layout, layouts) => {
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
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        style={{ position: "relative" }}
      >
        <GridBox
          key="1"
          data-grid={{ w: 1, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}
        >
          <span className="text">1</span>
        </GridBox>
        <GridBox
          key="2"
          data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}
        >
          <span className="text">2</span>
        </GridBox>
        <GridBox
          key="3"
          data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}
        >
          <span className="text">3</span>
        </GridBox>
        <GridBox
          key="4"
          data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}
        >
          <span className="text">4</span>
        </GridBox>
        <GridBox
          key="5"
          data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}
        >
          <span className="text">5</span>
        </GridBox>
      </ResponsiveReactGridLayout>
    </Box>
  );
};

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}

export default ResponsiveLocalStorageLayout;
