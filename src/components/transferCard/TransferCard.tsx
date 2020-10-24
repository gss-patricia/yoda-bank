import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Collapse,
  Fab,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";

import transfer from "../../assets/transfer.svg";
import AlertDialog from "../dialog";
import composeRefs from "../helpers/composeRefs";
import EFieldForm from "../../Enums/EFieldForm";
import useForm from "../helpers/Hooks/useForm";

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
}));

const Transfer = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [transferValue, setInputTransfer] = useState();
  const container = React.useRef();
  const text = useForm(EFieldForm.text);

  const handleExpandClick = () => {
    setChecked((prev) => !prev);
  };

  const handleDialog = (param: any) => {
    if (param === "Sim") {
      //faz a chamada a api
      //pega o retorno e mostra alert
    }

    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleDialog("vaii porra");
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
                  Transferir
                </Button>
              </>
            )}
          </AlertDialog>
        </Collapse>
      </form>
    </Grid>
  );
};

export default Transfer;
