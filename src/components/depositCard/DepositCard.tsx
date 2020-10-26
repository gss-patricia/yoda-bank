import React, { useState, ChangeEvent, useRef, memo, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import clsx from "clsx";
import useFetch from "../../helpers/Hooks/useFetch";
import { POST_OPERACAO } from "../../APIs/APIConta";
import wallet from "../../assets/wallet.svg";
import AlertDialog from "../dialog";
import composeRefs from "../../helpers/composeRefs";
import { ETypeOperation } from "../../Interfaces/IOperation";
import { useDispatch, useSelector } from "react-redux";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import TransitionsModal from "../modal";
import cheers from "../../assets/hacker.svg";
import sad from "../../assets/sad.svg";
import useStyles from "./DepositCard.style";
import { actions } from "../../actions/globalActions";
import messageCode from "../../Enums/MessageCode";

const STATUS_CODE_SUCCESS = [200, 201, 204];

const Deposit = () => {
  const classes = useStyles();
  const container = useRef();

  const [errorDeposit, setErrorDeposit] = useState("");
  const [openModal, setModal] = useState(false);
  const [statusCode, setStatusCode] = useState(messageCode.ERROR);
  const [valueMoney, setCurrency] = useState(0);

  const dispatch = useDispatch();
  const { loading, request } = useFetch();

  const { userReducers }: any = useSelector((state) => state);
  const { localStorageReducers }: any = useSelector((state) => state);
  const { yoToken, yoUuid } = localStorageReducers;
  const { saldo } = userReducers;

  const isEmptyFields = () => {
    if (valueMoney > 0) {
      return false;
    }
    return true;
  };

  const getMessage = (status: messageCode) => {
    const options = {
      success: "Com sucesso transferido foi!",
      error: "Com erro, o fracasso é.",
      nomoney: "Dinheiro suficiente deve você ter!!!",
    };

    return options[status];
  };

  const handleDialog = async (param: string) => {
    if (param === "Sim") {
      if (saldo < valueMoney) {
        setModal(true);
        setStatusCode(messageCode.NOMONEY);
      }

      if (!isEmptyFields()) {
        handleSubmit();
      }
    } else {
      setModal(false);
    }
  };

  const handleExtrato = async () => {
    return actions.getExtrato(yoUuid, yoToken, 0);
  };

  const handleSaldo = async () => {
    return actions.getSaldo(yoUuid, yoToken);
  };

  const handleSubmit = async (event?: any) => {
    if (event) event.preventDefault();
    if (loading || valueMoney <= 0) return null;

    const { url, options } = POST_OPERACAO(
      {
        conta: localStorageReducers.yoUuid,
        tipo: ETypeOperation.DEPOSITO,
        valor: valueMoney,
      },
      localStorageReducers.yoToken
    );

    const { response } = await request(url, options);

    if (STATUS_CODE_SUCCESS.includes(response?.status!)) {
      setStatusCode(messageCode.SUCCESS);
      setCurrency(0);
      handleSaldo().then((saldoAction) => dispatch(saldoAction));
      handleExtrato().then((state) => dispatch(state));
    } else {
      setStatusCode(messageCode.ERROR);
    }
    setModal(true);
  };

  return (
    <Grid
      md={5}
      sm={5}
      xs={12}
      className={clsx([classes.marginBottom, classes.transferGrid])}
    >
      <Box className={classes.box}>
        <img className={classes.image} alt="transfer" src={wallet} />
        <Typography component="h3" variant="h5">
          Depósito
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} id="depositForm">
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
          title="Depósito"
          titleId="deposit-op"
          content="O depósito você confirma?"
          contentId="deposit-cont"
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
                  "Depositar"
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

export default memo(Deposit);
