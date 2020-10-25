import React, { useEffect } from "react";
import {
  Grid,
  CssBaseline,
  Box,
  Typography,
  Paper,
  Divider,
} from "@material-ui/core";
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
import useStyles from "./Home.style";

import { actions } from "../../actions/globalActions";

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
