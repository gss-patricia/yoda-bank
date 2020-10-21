import React from "react";
import {
  makeStyles,
  Grid,
  Paper,
  CssBaseline,
  Typography,
  Box,
  Button,
} from "@material-ui/core";

import Logo from "../../assets/logo-white.svg";

import ToggleDrawer from "../toggleDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "70px",
  },
  headerWrapper: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
  },
  paper: {
    display: "flex",
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "70px",
    padding: theme.spacing(2),
  },
  paperSecond: {
    display: "flex",
    flexDirection: "row",
    color: "white",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "70px",
    padding: theme.spacing(2),
  },
  logout: {
    width: "50px",
    marginLeft: "10px",
    backgroundColor: "#4C2A85",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={12} component={Paper} elevation={6} square>
        <div className={classes.headerWrapper}>
          <Box className={classes.paper} width="50%">
            <ToggleDrawer />
            <img src={Logo} alt="Logo" />
            <Typography component="h1" variant="h5">
              Yoda Coins Beer
            </Typography>
          </Box>
          <Box className={classes.paperSecond} width="50%">
            <Typography component="h1" variant="h5">
              Fakewilson
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.logout}
            >
              Sair
            </Button>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default Header;
