import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Collapse,
  Fab,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import transfer from "../../assets/transfer.svg";
import AlertDialog from "../dialog";
import composeRefs from "../../helpers/composeRefs";
import useForm from "../../helpers/Hooks/useForm";
import EFieldForm from "../../Enums/EFieldForm";
import TransitionsModal from "../modal";
import { GET_SALDO } from "../../APIs/APIConta";
import useFetch from "../../helpers/Hooks/useFetch";
import UserAction from "../../store/actions/UserActions";
import cheers from "../../assets/hacker.svg";

const useStyles = makeStyles((thee) => ({
  root: {
    backgroundColor: "#F3EFF5",
  },
  button: {
    color: "#275F40",
    fontSize: "1rem",
    padding: "5px 15px",
    fontWeight: "bold",
    margin: "15px 0 15px 7%",
  },
  image: {
    width: "50%",
    marginLeft: "-18px",
  },
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
  },
  transferGrid: {
    backgroundColor: "#FAFAFA",
  },
  typography: {
    fontWeight: "bold",
    marginTop: "20px",
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

const Transfer = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [openModal, setModal] = useState(false);

  const container = React.useRef();
  const text = useForm(EFieldForm.text);
  const { userReducers }: any = useSelector((state) => state);
  const { localStorageReducers }: any = useSelector((state) => state);
  const { loading, error, request } = useFetch();
  const dispatch = useDispatch();
  const receiver = useForm(EFieldForm.text);
  const transferValue = useForm(EFieldForm.text);

  const { yoToken } = localStorageReducers;
  const { uuid, saldo } = userReducers;

  const handleExpandClick = () => {
    setChecked((prev) => !prev);
  };

  const handleDialog = (param: any) => {
    if (param === "Sim") {
      //faz a chamada a api
      //pega o retorno e mostra alert
      setTimeout(() => {
        setModal(true);
      }, 1000);
    }

    setModal(false);
  };

  useEffect(() => {
    const getSaldo = async () => {
      if (!uuid) return null;
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
  }, [userReducers, openModal]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Grid
      xs={12}
      sm={9}
      md={3}
      className={clsx([classes.marginBottom, classes.transferGrid])}
    >
      <Box onClick={handleExpandClick} className={classes.box}>
        <img className={classes.image} alt="transfer" src={transfer} />
        <Typography component="h3" variant="h5" className={classes.typography}>
          Transferir
        </Typography>
        <Fab className={classes.addIcon} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
      <form onSubmit={handleSubmit}>
        <Collapse in={checked} className={classes.collapsedInput}>
          <TextField
            label="Chave"
            required
            name="receiver"
            id="receiver"
            type="text"
            className={clsx([classes.inputMargin, classes.inputWidth])}
          />
          <TextField
            margin="normal"
            required
            name="transferValue"
            label="R$"
            type="text"
            className={classes.inputMargin}
            id="trasferValue"
            {...text}
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
                  type="submit"
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
        </Collapse>
      </form>

      {openModal && (
        <TransitionsModal title="Com sucesso transferido foi!">
          <img className={classes.cheers} src={cheers} />
        </TransitionsModal>
      )}
    </Grid>
  );
};

export default Transfer;
