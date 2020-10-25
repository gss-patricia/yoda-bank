import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

import useStyles from "./TransferCard.style";
import transfer from "../../assets/transfer.svg";
import AlertDialog from "../dialog";
import composeRefs from "../../helpers/composeRefs";

import TransitionsModal from "../modal";
import { GET_SALDO } from "../../APIs/APIConta";
import { PRODUCER_OPERATION } from "../../APIs/APITransfer";
import useFetch from "../../helpers/Hooks/useFetch";
import UserAction from "../../store/actions/UserActions";
import cheers from "../../assets/hacker.svg";
import sad from "../../assets/sad.svg";

const Transfer = () => {
  enum messageCode {
    SUCCESS = "success",
    ERROR = "error",
    NOMONEY = "nomoney",
  }
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [openModal, setModal] = useState(false);
  const [valueMoney, setCurrency] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [statusCode, setStatusCode] = useState(messageCode.ERROR);

  const container = useRef();

  const dispatch = useDispatch();
  const { request } = useFetch();
  const { userReducers }: any = useSelector((state) => state);
  const { localStorageReducers }: any = useSelector((state) => state);

  const { yoToken, yoUuid } = localStorageReducers;
  const { saldo } = userReducers;

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
      className={clsx([classes.marginBottom, classes.transferGrid])}
    >
      <Box className={classes.box}>
        <img className={classes.image} alt="transfer" src={transfer} />
        <Typography component="h3" variant="h5" className={classes.typography}>
          Transferência
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} id="transferForm">
        <TextField
          label="Chave"
          required
          value={receiver}
          name="receiver"
          id="receiver"
          type="text"
          className={clsx([classes.inputMargin, classes.inputWidth])}
          onChange={changeReceiver}
        />

        <CurrencyTextField
          variant="standard"
          value={valueMoney}
          label="R$"
          currencySymbol=""
          outputFormat="number"
          text
          required
          decimalCharacter=","
          digitGroupSeparator="."
          textAlign="left"
          className={clsx([classes.inputMargin, classes.inputWidth])}
          onChange={(
            event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
            value: number
          ) => setCurrency(value)}
        />
        <AlertDialog
          title="Transferir"
          titleId="transfer-op"
          content="A transferência você confirma?"
          contentId="transfer-cont"
          ButtonTextFirst="Não"
          ButtonTextSecond="Sim"
          handleAgree={handleDialog}
        >
          {({ isOpen, triggerRef, toggle }) => (
            <>
              <Button
                className={classes.button}
                ref={composeRefs(triggerRef, container)}
                onClick={toggle}
                disabled={isEmptyFields()}
              >
                {isOpen ? (
                  <CircularProgress size={24} color="secondary" />
                ) : (
                  "Transferir"
                )}
              </Button>
            </>
          )}
        </AlertDialog>
      </form>

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

export default Transfer;
