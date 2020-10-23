import React, { useState } from "react";
import {
  Grid,
  CssBaseline,
  Box,
  Typography,
  Button,
  Paper,
  Collapse,
  InputAdornment,
  Input,
  Fab,
  Divider,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";
import transfer from "../../assets/transfer.svg";
import pigbank from "../../assets/pigbank.svg";
import Header from "../header";
import clsx from "clsx";

import AlertDialog from "../dialog";
import Extract from "../extract";
import composeRefs from "../helpers/composeRefs";

const useStyles = makeStyles((theme) => ({
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
  marginTop: {
    marginTop: "50px",
  },
  pigBank: {
    display: "flex",
    maxHeight: "155px",
    color: "#275F40",
    marginLeft: "5%",
  },
  depositTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  collapsedInput: {
    backgroundColor: "#F3EFF5",
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
  saldo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginTop: "15px",
  },
  saldoInfo: {
    fontSize: "1.2rem",
    marginTop: "5px",
  },
  date: {
    color: "#9C9696",
    marginTop: "30%",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Launch: React.FC = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const container = React.useRef();

  const handleExpandClick = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Grid
      container
      component="main"
      alignContent="flex-start"
      className={classes.root}
    >
      <CssBaseline />
      <Header />
      <Grid
        container
        alignContent="flex-start"
        justify="space-around"
        xs={12}
        sm={12}
        md={12}
        className={clsx([classes.marginTop, classes.gridHeigh])}
      >
        <Grid
          xs={12}
          sm={9}
          md={3}
          className={clsx([classes.marginBottom, classes.transferGrid])}
        >
          <Box onClick={handleExpandClick} className={classes.box}>
            <img className={classes.image} alt="transfer" src={transfer} />
            <Typography
              component="h3"
              variant="h5"
              className={classes.typography}
            >
              Transferir
            </Typography>
            <Fab className={classes.addIcon} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Box>
          <Collapse in={checked} className={classes.collapsedInput}>
            <TextField
              label="Chave"
              className={clsx([classes.inputMargin, classes.inputWidth])}
            />
            <Input
              className={classes.inputMargin}
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
            />

            <AlertDialog
              title="Transferir"
              titleId="transfer-op"
              content="A transferência você confirma?"
              contentId="transfer-cont"
              ButtonTextFirst="Não"
              ButtonTextSecond="Sim"
            >
              {({ isOpen, triggerRef, toggle }) => (
                <>
                  <Button
                    className={classes.button}
                    ref={composeRefs(triggerRef, container)}
                    onClick={toggle}
                  >
                    Transferir
                  </Button>
                </>
              )}
            </AlertDialog>
          </Collapse>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={3}
          elevation={6}
          component={Paper}
          square
          className={clsx([classes.pigBank, classes.transferGrid])}
        >
          <img className={classes.image} alt="trasnfer" src={pigbank} />
          <Box>
            <Typography component="h3" variant="h5" className={classes.saldo}>
              Meu Saldo
            </Typography>
            <Typography
              component="h2"
              variant="h5"
              className={clsx([classes.saldo, classes.saldoInfo])}
            >
              R$ 5.000,00
            </Typography>
            <Typography variant="subtitle1" className={classes.date}>
              00/00/0000 00:00
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        alignContent="flex-start"
        justify="center"
        xs={12}
        sm={6}
        md={12}
        className={clsx([
          classes.marginTop,
          classes.gridHeigh,
          classes.centered,
        ])}
      >
        <Grid xs={12} sm={4} md={7} elevation={6} component={Paper} square>
          <Extract />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Launch;
