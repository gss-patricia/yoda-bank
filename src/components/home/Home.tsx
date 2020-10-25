import React, { useEffect } from "react";
import {
  Grid,
  CssBaseline,
  Box,
  Typography,
  Paper,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import pigbank from "../../assets/pigbank.svg";
import LayoutBase from "../../components/layout";
import clsx from "clsx";
import TransferCard from "../transferCard";
import DepositCard from "../depositCard";
import Extract from "../extract";
import UserAction from "../../store/actions/UserActions";
import useFetch from "../../helpers/Hooks/useFetch";
import { GET_EXTRATO } from "../../APIs/APIConta";
import IUser from "../../Interfaces/IUser";
import jwt_decode from "jwt-decode";
import { ExtratoConta } from "../../store/reducers/userReducers";
import useStyles from "./Home.style";

import { actions } from "../../actions/globalActions";

const Launch = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, request } = useFetch();

  const { localStorageReducers }: any = useSelector((state) => state);

  const user: IUser = jwt_decode(localStorageReducers.yoToken);
  useEffect(() => {
    dispatch({
      type: UserAction.SET_USER,
      payload: { user: user },
    });
  }, []);

  const { userReducers }: any = useSelector((state) => state);
  const { yoUuid } = localStorageReducers;
  const { extrato, saldo } = userReducers;
  const date = new Date().toLocaleDateString();

  return (
    <Grid container component="main" alignContent="flex-start">
      <CssBaseline />
      <LayoutBase>
        <>
          <Typography component="h3" variant="h5" className={classes.saldo}>
            {`Yox: ${yoUuid} *** COlocar css`}
          </Typography>
          <Grid
            container
            alignContent="flex-start"
            justify="space-around"
            xs={12}
            sm={12}
            md={12}
            className={classes.gridHeigh}
          >
            <Grid
              md={9}
              sm={9}
              xs={12}
              elevation={6}
              component={Paper}
              square
              className={clsx([classes.pigBank, classes.transferGrid])}
            >
              <img alt="trasnfer" src={pigbank} />
              <Box>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.saldo}
                >
                  Meu Saldo
                </Typography>

                <Typography
                  component="h2"
                  variant="h5"
                  className={clsx([classes.saldo, classes.saldoInfo])}
                >
                  {loading || error ? (
                    <CircularProgress size={24} color="secondary" />
                  ) : (
                    saldo.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                  )}
                </Typography>
                <Typography variant="subtitle1" className={classes.date}>
                  {date}
                </Typography>
              </Box>
            </Grid>
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
            <Extract extrato={extrato} />
          </Grid>
        </>
      </LayoutBase>
    </Grid>
  );
};

export default Launch;
