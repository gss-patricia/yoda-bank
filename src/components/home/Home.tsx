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
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import pigbank from "../../assets/pigbank.svg";
import LayoutBase from "../../components/layout";
import clsx from "clsx";
import TransferCard from "../transferCard";
import DepositCard from "../depositCard";
import Extract from "../extract";
import UserAction from "../../store/actions/UserActions";
import useFetch from "../../helpers/Hooks/useFetch";
import { GET_EXTRATO, GET_SALDO } from "../../APIs/APIConta";
import IUser from "../../Interfaces/IUser";
import jwt_decode from "jwt-decode";
import { ExtratoConta } from "../../store/reducers/userReducers";

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
  const { saldo, extrato } = userReducers;
  const date = new Date().toLocaleDateString();

  const getSaldo = async () => {
    if (!yoUuid) return null;
    const { url, options } = GET_SALDO(yoUuid, yoToken);
    const { response, json } = await request(url, options);
    if (response?.ok) {
      dispatch({
        type: UserAction.SET_SALDO,
        payload: {
          saldo: json.saldo,
        },
      });
    }
  };

  useEffect(() => {
    getSaldo();
  }, [saldo]);

  useEffect(() => {
    async function getExtrato() {
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
      //const { response, json } = await request(url, options);
      if (true) {
        //response?.ok
        dispatch({
          type: UserAction.SET_EXTRATO,
          payload: {
            //json.content.map((extrato: ExtratoConta) => extrato),
            extrato: [
              {
                descricaoOperacao: "DEPOSITO",
                id: 0,
                tipo: "DEPOSITO",
                valor: 500,
                timestamp: {
                  day: 24,
                  month: 10,
                  year: 2020,
                  hours: 12,
                  minutes: 13,
                  seconds: 45,
                },
              },
              {
                descricaoOperacao: "TRANSFERENCIA_DESTINO",
                id: 1,
                tipo: "DEPOSITO",
                valor: 700,
                timestamp: {
                  day: 24,
                  month: 10,
                  year: 2020,
                  hours: 12,
                  minutes: 13,
                  seconds: 45,
                },
              },
              {
                descricaoOperacao: "TRANSFERENCIA_ORIGEM",
                id: 2,
                tipo: "SAQUE",
                valor: 500,
                timestamp: {
                  day: 24,
                  month: 10,
                  year: 2020,
                  hours: 12,
                  minutes: 13,
                  seconds: 45,
                },
              },
              {
                descricaoOperacao: "SAQUE",
                id: 3,
                tipo: "SAQUE",
                valor: -300,
                timestamp: {
                  day: 24,
                  month: 10,
                  year: 2020,
                  hours: 12,
                  minutes: 13,
                  seconds: 45,
                },
              },
            ],
          },
        });
      }
    }
    getExtrato();
  }, []);

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
