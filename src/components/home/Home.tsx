import React, { useState } from "react";
import {
  Grid,
  CssBaseline,
  Box,
  Typography,
  Button,
  Paper,
  Collapse,
  InputAdornment,
  Input,
  Fab,
  Divider,
  TextField,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import pigbank from "../../assets/pigbank.svg";
import Header from "../header";
import clsx from "clsx";
import TransferCard from "../transferCard";
import Extract from "../extract";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F3EFF5",
  },
  button: {
    color: "#275F40",
    fontSize: "1rem",
    padding: "5px 15px",
    fontWeight: "bold",
    margin: "15px 0 15px 7%",
  },
  box: {
    color: "#275F40",
    display: "flex",
    minHeight: "90px",
    position: "relative",
    cursor: "pointer",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  marginTop: {
    marginTop: "50px",
  },
  transferGrid: {
    backgroundColor: "#FAFAFA",
  },
  pigBank: {
    display: "flex",
    color: "#275F40",
    maxHeight: "155px",
    minHeight: "155px",
    margin: "10% 5%",
  },
  depositTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  collapsedInput: {
    backgroundColor: "white",
  },
  inputMargin: {
    margin: "15px 15px",
  },
  inputWidth: {
    width: "90%",
  },
  gridHeigh: {
    maxHeight: "30%",
    justifyContent: "center",
  },
  typography: {
    fontWeight: "bold",
    marginTop: "20px",
  },
  saldo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginTop: "15px",
  },
  saldoInfo: {
    fontSize: "1.2rem",
    marginTop: "5px",
  },
  date: {
    color: "#9C9696",
    marginTop: "30%",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Launch: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      component="main"
      alignContent="flex-start"
      className={classes.root}
    >
      <CssBaseline />
      <Header />
      <Grid
        container
        alignContent="flex-start"
        justify="space-around"
        xs={12}
        sm={12}
        md={12}
        className={clsx([classes.marginTop, classes.gridHeigh])}
      >
        <TransferCard />
        <Grid
          xs={12}
          sm={6}
          md={3}
          elevation={6}
          component={Paper}
          square
          className={clsx([classes.pigBank, classes.transferGrid])}
        >
          <img alt="trasnfer" src={pigbank} />
          <Box>
            <Typography component="h3" variant="h5" className={classes.saldo}>
              Meu Saldo
            </Typography>
            <Typography
              component="h2"
              variant="h5"
              className={clsx([classes.saldo, classes.saldoInfo])}
            >
              R$ 5.000,00
            </Typography>
            <Typography variant="subtitle1" className={classes.date}>
              00/00/0000 00:00
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        alignContent="flex-start"
        justify="center"
        xs={12}
        sm={6}
        md={12}
        className={clsx([
          classes.marginTop,
          classes.gridHeigh,
          classes.centered,
        ])}
      >
        <Grid xs={12} sm={4} md={7} elevation={6} component={Paper} square>
          <Extract />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Launch;
