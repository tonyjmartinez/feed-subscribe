import React, { ReactNode } from "react";
import { Grommet } from "grommet";
import withAppContext from "./withAppContext";

interface Props {
  children: ReactNode;
  context: {
    isDarkMode: boolean;
    setIsDarkMode: Function;
  };
}

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
            brand: {
              dark: "#7700cc",
              light: "#6600cc"
            },
            background: {
              dark: "#111111",
              light: "#FFFFFF"
            },
            "background-back": {
              dark: "#111111",
              light: "#EEEEEE"
            },
            "background-front": {
              dark: "#222222",
              light: "#FFFFFF"
            },
            "background-contrast": {
              dark: "#FFFFFF11",
              light: "#11111111"
            },
            text: {
              dark: "#EEEEEE",
              light: "#333333"
            },
            "text-strong": {
              dark: "#FFFFFF",
              light: "#000000"
            },
            "text-weak": {
              dark: "#CCCCCC",
              light: "#444444"
            },
            "text-xweak": {
              dark: "#999999",
              light: "#666666"
            },
            border: {
              dark: "#444444",
              light: "#CCCCCC"
            },
            control: "brand",
            "active-background": "background-contrast",
            "active-text": "text-strong",
            "selected-background": "brand",
            "selected-text": "text-strong",
            "status-critical": "#FF4040",
            "status-warning": "#FFAA15",
            "status-ok": "#00C781",
            "status-unknown": "#CCCCCC",
            "status-disabled": "#CCCCCC",
            "graph-0": "brand",
            "graph-1": "status-warning"
          },
          font: {
            family: "Helvetica"
          },
          active: {
            color: "active-text"
          },
          hover: {
            background: "active-background",
            color: "active-text"
          },
          selected: {
            background: "selected-background",
            color: "selected-text"
          }
        }
      }}
    >
      {props.children}
    </Grommet>
  );
};

export default withAppContext(GromProvider);
