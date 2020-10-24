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
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [openModal, setModal] = useState(false);
  const [valueMoney, setCurrency] = useState("");
  const [receiver, setReceiver] = useState("");
  const [statusCode, setStatusCode] = useState(1);

  const container = useRef();

  const dispatch = useDispatch();
  const { request } = useFetch();
  const { userReducers }: any = useSelector((state) => state);
  const { localStorageReducers }: any = useSelector((state) => state);
  const message = {
    success: "Com sucesso transferido foi!",
    error: "Com erro, o fracasso é.",
  };

  const { yoToken } = localStorageReducers;
  const { uuid, saldo } = userReducers;

  const handleDialog = async (param: string) => {
    if (param === "Sim") {
      if (receiver.length > 0 && parseInt(valueMoney) > 0) {
        handleSubmit();
      }
    }
    setModal(false);
  };

  useEffect(() => {
    const getSaldo = async () => {
      const { url, options } = GET_SALDO(uuid, yoToken);
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
        origem: uuid,
        valor: parseInt(valueMoney),
      },
      yoToken
    );

    const { response } = await request(url, options);

    if (response?.status === 200) {
      setModal(true);
      setStatusCode(200);
    } else {
      setModal(true);
      setStatusCode(1);
    }
  };

  const changeReceiver = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    setReceiver(value);
  };

  const changeCurrency = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCurrency(value);
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
          outputFormat="string"
          text
          required
          decimalCharacter=","
          digitGroupSeparator="."
          textAlign="left"
          className={clsx([classes.inputMargin, classes.inputWidth])}
          onChange={(event: any, value: any) => setCurrency(value)}
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
        <TransitionsModal
          title={statusCode === 200 ? message.success : message.error}
        >
          <img
            className={classes.cheers}
            src={statusCode === 200 ? cheers : sad}
          />
        </TransitionsModal>
      )}
    </Grid>
  );
};

export default Transfer;
