import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { ChildrenType } from "./global";

const Theme = ({ children }: ChildrenType) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#219653",
      },
      secondary: {
        main: "#275F40",
      },
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 15,
        },
      },
    },
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default Theme;
