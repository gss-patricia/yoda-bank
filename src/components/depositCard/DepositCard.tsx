import React, { useState, ChangeEvent, useRef } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import useFetch from "../../helpers/Hooks/useFetch";
import { GET_EXTRATO, GET_SALDO, POST_OPERACAO } from "../../APIs/APIConta";
import wallet from "../../assets/wallet.svg";
import AlertDialog from "../dialog";
import composeRefs from "../../helpers/composeRefs";
import useForm from "../../helpers/Hooks/useForm";
import EFieldForm from "../../Enums/EFieldForm";
import { ETypeOperation } from "../../Interfaces/IOperation";
import { useDispatch, useSelector } from "react-redux";
import UserAction from "../../store/actions/UserActions";
import Error from "../../components/error/Error";
import { ExtratoConta } from "../../store/reducers/userReducers";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

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
}));

const Deposit = () => {
  const classes = useStyles();
  const container = useRef();

  const [errorDeposit, setErrorDeposit] = useState("");
  const [valueMoney, setCurrency] = useState(0);

  const dispatch = useDispatch();
  const { loading, request } = useFetch();

  const { localStorageReducers }: any = useSelector((state) => state);
  const { yoToken, yoUuid } = localStorageReducers;

  const handleDialog = (param: any) => console.log(param);

  const handleTransfer = async (event: any) => {
    if (loading) return null;
    if (valueMoney <= 0) {
      setErrorDeposit("Informe um valor de depósito");
      setTimeout(() => {
        setErrorDeposit("");
      }, 3000);
      return;
    }

    const { url, options } = POST_OPERACAO(
      {
        conta: localStorageReducers.yoUuid,
        tipo: ETypeOperation.DEPOSITO,
        valor: valueMoney,
      },
      localStorageReducers.yoToken
    );

    //TODO: TORNAR A FUNÇÃO  GET_SALDO GLOBAL
    //TODO: VERIFICAR VALIDAÇÕES
    const { response, json } = await request(url, options);
    if (response?.ok) {
      const { url, options } = GET_SALDO(yoUuid, yoToken);
      const { response, json } = await request(url, options);
      if (response?.ok) {
        setCurrency(0);
        dispatch({
          type: UserAction.SET_SALDO,
          payload: {
            saldo: json.saldo,
          },
        });
        getExtrato();
      } else {
        //TODO: REVER MENSSAGEM
        setErrorDeposit("Houve um erro, tente mais tarde!");
      }
    }
  };

  //TODO: TORNAR A FUNÇÃO  GET_SALDO GLOBAL
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
      <Box className={classes.collapsedInput}>
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
        <div>
          <AlertDialog
            title="Transferir"
            titleId="transfer-op"
            content="A transferência você confirma?"
            contentId="transfer-cont"
            ButtonTextFirst="Não"
            ButtonTextSecond="Sim"
            handleAgree={handleDialog}
          >
            {({ triggerRef }) => (
              <>
                <Button
                  className={classes.button}
                  ref={composeRefs(triggerRef, container)}
                  onClick={handleTransfer}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={24} color="secondary" />
                      AGUARDE
                    </>
                  ) : (
                    "DEPOSITAR"
                  )}
                </Button>
              </>
            )}
          </AlertDialog>
          <Error error={errorDeposit} severity="warning" />
        </div>
      </Box>
    </Grid>
  );
};

export default Deposit;
