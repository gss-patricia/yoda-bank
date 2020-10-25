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

import TransitionsModal from "../modal";
import { GET_SALDO } from "../../APIs/APIConta";
import { PRODUCER_OPERATION } from "../../APIs/APITransfer";
import useFetch from "../../helpers/Hooks/useFetch";
import UserAction from "../../store/actions/UserActions";
import cheers from "../../assets/hacker.svg";
import sad from "../../assets/sad.svg";

const Balance = () => {
  enum messageCode {
    SUCCESS = "success",
    ERROR = "error",
    NOMONEY = "nomoney",
  }
  const classes = useStyles();
  const [openModal, setModal] = useState(false);
  const [valueMoney, setCurrency] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [statusCode, setStatusCode] = useState(messageCode.ERROR);

  const container = useRef();

  const dispatch = useDispatch();
  const { loading, error, request } = useFetch();
  const { userReducers }: any = useSelector((state) => state);
  const { localStorageReducers }: any = useSelector((state) => state);

  const { yoToken, yoUuid } = localStorageReducers;
  const { saldo } = userReducers;

  const date = new Date().toLocaleDateString();

  const handleDialog = async (param: string) => {
    if (param === "Sim") {
      if (saldo < valueMoney) {
        setModal(true);
        setStatusCode(messageCode.NOMONEY);
      }

      if (isEmptyFields() && saldo > valueMoney) {
        handleSubmit();
      }
    } else {
      setModal(false);
    }
  };

  useEffect(() => {
    const getSaldo = async () => {
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

    getSaldo();
  }, [saldo, openModal]);

  const handleSubmit = async () => {
    const { url, options } = PRODUCER_OPERATION(
      {
        destino: receiver,
        origem: yoUuid,
        valor: valueMoney,
      },
      yoToken
    );

    const { response } = await request(url, options);

    if (response?.status === 200) {
      setModal(true);
      setStatusCode(messageCode.SUCCESS);
    } else {
      setModal(true);
      setStatusCode(messageCode.ERROR);
    }
  };

  const isEmptyFields = () => {
    if (receiver?.length > 0 && valueMoney > 0) {
      return false;
    }
    return true;
  };

  const changeReceiver = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    setReceiver(value);
  };

  const getMessage = (status: messageCode) => {
    const options = {
      success: "Com sucesso transferido foi!",
      error: "Com erro, o fracasso é.",
      nomoney: "Dinheiro suficiente deve você ter!!!",
    };

    return options[status];
  };

  return (
    <Grid
      md={5}
      sm={5}
      xs={12}
      className={clsx([classes.marginBottom, classes.balanceGrid])}
    >
      <Grid
        md={9}
        sm={9}
        xs={12}
        elevation={6}
        component={Paper}
        square
        className={clsx([classes.pigBank, classes.balanceGrid])}
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

      {openModal && (
        <TransitionsModal title={getMessage(statusCode)}>
          <img
            className={classes.cheers}
            src={statusCode === messageCode.SUCCESS ? cheers : sad}
          />
        </TransitionsModal>
      )}
    </Grid>
  );
};

export default Balance;
