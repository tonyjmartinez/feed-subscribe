import React, { ReactNode } from "react";
import { Grommet } from "grommet";
import withAppContext from "./withAppContext";
import { css } from "styled-components";

interface Props {
  children: ReactNode;
  context: {
    isDarkMode: boolean;
    setIsDarkMode: Function;
  };
}
const checkboxCheckStyle = css`
  background-color: #2196f3;
  border-color: #2196f3;
`;

const GromProvider = (props: Props) => {
  const { context } = props;
  const { isDarkMode } = context;
  console.log("grom context", context);
  return (
    <Grommet
      themeMode={isDarkMode ? "dark" : "light"}
      full
      theme={{
        global: {
          colors: {
            "toggle-bg": "#757575",
            "toggle-knob": "white",
            "toggle-accent": "accent-2",
            brand: {
              dark: "#7700cc",
              light: "#6600cc"
            },
            background: {
              dark: "#111111",
              light: "#FFFFFF"
            }
          }
        },
        checkBox: {
          border: {
            color: {
              light: "toggle-bg"
            }
          },
          color: {
            light: "toggle-knob"
          },
          check: {
            radius: "2px"
          },
          hover: {
            border: {
              color: undefined
            }
          },
          toggle: {
            background: { light: "toggle-accent" },
            color: {
              light: "toggle-knob"
            },
            size: "36px",
            knob: {
              extend: `
              top: -4px;
              box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.12),
               0px 2px 2px 0px rgba(0,0,0,0.24);
            `
            },
            extend: ({ checked }) => `
            height: 14px;
            ${checked && checkboxCheckStyle}
          `
          },
          gap: "xsmall",
          size: "18px"
        }
      }}
    >
      {props.children}
    </Grommet>
  );
};

export default withAppContext(GromProvider);
