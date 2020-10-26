import React, { useState, useEffect, useRef, ChangeEvent, memo } from "react";
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
import { PRODUCER_OPERATION } from "../../APIs/APITransfer";
import useFetch from "../../helpers/Hooks/useFetch";
import cheers from "../../assets/partty.svg";
import sad from "../../assets/sad.svg";
import messageCode from "../../Enums/MessageCode";
import { actions } from "../../actions/globalActions";

const STATUS_CODE_SUCCESS = [200, 201, 204];

const Transfer = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openModal, setModal] = useState(false);
  const [valueMoney, setCurrency] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [statusCode, setStatusCode] = useState(messageCode.ERROR);

  const container = useRef();

  const { request, loading } = useFetch();
  const { userReducers }: any = useSelector((state) => state);
  const { localStorageReducers }: any = useSelector((state) => state);

  const { yoToken, yoUuid } = localStorageReducers;
  const { saldo } = userReducers;

  const handleDialog = async (param: string) => {
    if (param === "Sim") {
      setModal(false);
      if (saldo < valueMoney) {
        setTimeout(() => {
          setStatusCode(messageCode.NOMONEY);
          setModal(true);
        }, 1000);
      }

      if (!isEmptyFields() && saldo > valueMoney) {
        handleSubmit();
      }
    }
  };

  const handleSaldo = async () => {
    return actions.getSaldo(yoUuid, yoToken);
  };

  const handleExtrato = async () => {
    return actions.getExtrato(yoUuid, yoToken, 0);
  };

  useEffect(() => {}, [statusCode, openModal]);

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

    if (STATUS_CODE_SUCCESS.includes(response?.status!)) {
      setModal(true);
      setCurrency(0);
      setStatusCode(messageCode.SUCCESS);
      handleSaldo().then((saldoAction) => dispatch(saldoAction));
      handleExtrato().then((extratoAction) => dispatch(extratoAction));
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
        <img alt="transfer" src={transfer} />
        <Typography component="h3" variant="h5">
          Transferência
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} id="transferForm">
        <TextField
          label="Yox"
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

      {!loading && openModal && (
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

export default memo(Transfer);
