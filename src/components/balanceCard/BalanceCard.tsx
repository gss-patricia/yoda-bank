import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

import useStyles from "./BalanceCard.style";
import pigbank from "../../assets/pigbank.svg";

import useFetch from "../../helpers/Hooks/useFetch";
import { actions } from "../../actions/globalActions";

const Balance = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [erroSaldo, setErroSaldo] = useState(false);
  const { loading, error, request } = useFetch();
  const { userReducers }: any = useSelector((state) => state);
  const { localStorageReducers }: any = useSelector((state) => state);

  const { yoToken, yoUuid } = localStorageReducers;
  const { saldo } = userReducers;

  const date = new Date().toLocaleDateString();

  const handleSaldo = async () => {
    return actions.getSaldo(yoUuid, yoToken);
  };

  useEffect(() => {
    handleSaldo()
      .then((saldoAction) => dispatch(saldoAction))
      .catch(() => setErroSaldo(true));
  }, [saldo]);

  return (
    <Grid md={5} sm={5} xs={12} className={clsx([classes.balanceGrid])}>
      <Grid
        md={12}
        sm={12}
        xs={12}
        elevation={6}
        component={Paper}
        square
        className={clsx([classes.pigBank, classes.balanceGrid])}
      >
        <img alt="transfer" src={pigbank} />
        <Box>
          <Typography component="h3" variant="h5" className={classes.saldo}>
            Meu Saldo
          </Typography>

          <Typography
            component="h2"
            variant="h5"
            className={clsx([classes.saldo, classes.saldoInfo])}
          >
            {loading || error || erroSaldo ? (
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
    </Grid>
  );
};

export default Balance;
