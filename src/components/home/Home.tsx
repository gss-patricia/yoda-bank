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
  const { yoToken, yoUuid } = localStorageReducers;
  const { extrato, saldo } = userReducers;
  const date = new Date().toLocaleDateString();

  const handleSaldo = async () => {
    return actions.getSaldo(yoUuid, yoToken);
  };

  useEffect(() => {
    handleSaldo().then((saldoAction) => dispatch(saldoAction));
  }, []);

  const getExtrato = async () => {
    if (!yoUuid) return null;

    const startDate = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() - 15);

    const { url, options } = GET_EXTRATO(
      yoUuid,
      yoToken,
      startDate.toISOString().split("T")[0],
      endDate.toISOString().split("T")[0]
    );
    const { response, json } = await request(url, options);
    if (response?.ok) {
      dispatch({
        type: UserAction.SET_EXTRATO,
        payload: {
          extrato: json.content.map((extrato: ExtratoConta) => extrato),
        },
      });
    }
  };

  useEffect(() => {
    getExtrato();
  }, []);

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
            <Grid xs={12} sm={4} md={7} elevation={6} component={Paper} square>
              <Extract extrato={extrato} />
            </Grid>
          </Grid>
        </>
      </LayoutBase>
    </Grid>
  );
};

export default Launch;
