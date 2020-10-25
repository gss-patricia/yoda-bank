import React, { useEffect } from "react";
import {
  Grid,
  CssBaseline,
  Box,
  Typography,
  Paper,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import LayoutBase from "../../components/layout";
import clsx from "clsx";
import TransferCard from "../transferCard";
import DepositCard from "../depositCard";
import BalanceCard from "../balanceCard";
import DataCard from "../dataCard";
import Extract from "../extract";
import UserAction from "../../store/actions/UserActions";
import IUser from "../../Interfaces/IUser";
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
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
  transferGrid: {
    backgroundColor: "#FAFAFA",
  },
  pigBank: {
    display: "flex",
    color: "#275F40",
    maxHeight: "155px",
    minHeight: "155px",
    margin: "5% 0 10%",
    [theme.breakpoints.up(600)]: {
      marginLeft: "5%",
    },
    "& img": {
      margin: "0 5% 0 0",
    },
    "& h3": {
      [theme.breakpoints.down(800)]: {
        fontSize: "1.3rem",
      },
    },
    "& h2": {
      [theme.breakpoints.down(800)]: {
        fontSize: "1.1rem",
      },
    },
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
    borderBottom: "1px solid #D2CDD1",
    margin: "25px 5%",
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

const Launch = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { localStorageReducers }: any = useSelector((state) => state);

  const user: IUser = jwt_decode(localStorageReducers.yoToken);
  useEffect(() => {
    dispatch({
      type: UserAction.SET_USER,
      payload: { user: user },
    });
  }, []);

  const { yoUuid } = localStorageReducers;

  return (
    <Grid container component="main" alignContent="flex-start">
      <CssBaseline />
      <LayoutBase>
        <>
          <Grid
            container
            alignContent="flex-start"
            justify="space-around"
            xs={12}
            sm={12}
            md={12}
            className={classes.gridHeigh}
          >
            <DataCard />
            <BalanceCard />
            <TransferCard />
            <DepositCard />
          </Grid>
          <Divider />
          <Grid
            container
            alignContent="flex-start"
            justify="center"
            xs={12}
            sm={12}
            md={12}
            className={clsx([classes.gridHeigh, classes.centered])}
          >
            <Extract />
          </Grid>
        </>
      </LayoutBase>
    </Grid>
  );
};

export default Launch;
