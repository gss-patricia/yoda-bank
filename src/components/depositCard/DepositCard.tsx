import React, { useState, ChangeEvent, useRef, memo, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
import { actions } from "../../actions/globalActions";
import messageCode from "../../Enums/MessageCode";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#275F40",
    fontSize: "1rem",
    padding: "5px 15px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  image: {
    minWidth: "191px",
    width: "30%",
    [theme.breakpoints.down(400)]: {
      opacity: "0",
      position: "absolute",
    },
  },
  box: {
    color: "#275F40",
    display: "flex",
    cursor: "pointer",
    justifyContent: "start",
    minHeight: "155px",
    backgroundColor: "#FAFAFA",
    [theme.breakpoints.down(400)]: {
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50px",
    },
    [theme.breakpoints.up(400)]: {
      position: "relative",
    },
    "& h3": {
      [theme.breakpoints.up(400)]: {
        position: "absolute",
        right: "10px",
      },
    },
  },
  marginBottom: {
    marginBottom: "30px",
  },
  collapsedInput: {
    padding: "5% 0",
    display: "flex",
    alignContent: "flex-end",
    alignItems: "flex-end",
    [theme.breakpoints.down(600)]: {
      flexWrap: "wrap",
      minHeight: "auto",
    },
  },
  inputMargin: {
    margin: "15px 15px",
    [theme.breakpoints.down(410)]: {
      width: "90%",
    },
    [theme.breakpoints.between(445, 600)]: {
      width: "57%",
    },
    [theme.breakpoints.between(601, 958)]: {
      width: "43%",
    },
    [theme.breakpoints.up(1024)]: {
      width: "48%",
    },
  },
  inputWidth: {
    width: "90%",
  },
  transferGrid: {
    backgroundColor: "#fff",
    [theme.breakpoints.up(600)]: {
      margin: "0 0 5% 5%",
    },
  },
  typography: {
    fontWeight: "bold",
    marginTop: "20px",
    [theme.breakpoints.down(800)]: {
      fontSize: "1.3rem",
    },
  },
  addIcon: {
    position: "absolute",
    marginTop: "113px",
    right: "35px",
  },
  cheers: {
    width: "100px",
  },
}));

const STATUS_CODE_SUCCESS = [200, 201, 204];

const Deposit = () => {
  enum messageCode {
    NONE = "none",
    SUCCESS = "success",
    ERROR = "error",
    NOMONEY = "nomoney",
  }
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
      none: "Com sucesso transferido foi!",
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

  useEffect(() => {
    if (statusCode !== messageCode.NONE) {
      handleSaldo().then((saldoAction) => dispatch(saldoAction));
      handleExtrato().then((state) => dispatch(state));
    }
    setStatusCode(messageCode.NONE);
  }, [statusCode]);

  const handleSubmit = async () => {
    if (loading) return null;

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
        <Typography component="h3" variant="h5" className={classes.typography}>
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
                  "Depósitar"
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
            src={
              statusCode === messageCode.SUCCESS ||
              statusCode === messageCode.NONE
                ? cheers
                : sad
            }
          />
        </TransitionsModal>
      )}
    </Grid>
  );
};

export default memo(Deposit);
