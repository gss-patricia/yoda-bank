import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ChildrenType } from './global';

const Theme = ({ children }: ChildrenType) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#94ECBE',
        main: '#219653',
      },
      secondary: {
        main: '#275F40',
      },
      error: {
        main: '#B80C09',
      },
      background: {
        default: "#F3EFF5"
      }
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
