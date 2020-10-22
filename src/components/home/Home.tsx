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
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";
import transfer from "../../assets/transfer.svg";
import pigbank from "../../assets/pigbank.svg";
import wallet from "../../assets/wallet.svg";
import cheers from "../../assets/hacker.svg";
import Header from "../header";
import clsx from "clsx";

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
  },
  thumbnail: {
    width: "100px",
  },
  box: {
    color: "#275F40",
    display: "flex",
    minHeight: "90px",
    position: "relative",
    cursor: "pointer",
  },
  boxSkin: {
    color: "#275F40",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  marginTop: {
    marginTop: "50px",
  },
  pigBank: {
    display: "flex",
    backgroundColor: "white",
    maxHeight: "81%",
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
  gridHeigh: {
    maxHeight: "30%",
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
  list: {
    backgroundColor: "white",
    width: "50%",
  },
  listItem: {
    textAlign: "right",
  },
}));

const Launch: React.FC = () => {
  const classes = useStyles();

  const [checked, setChecked] = useState(-1);

  const handleExpandClick = (i: number) => {
    setChecked(checked === i ? -1 : i);
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
          <Box onClick={() => handleExpandClick(1)} className={classes.box}>
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
          <Collapse in={checked === 1} className={classes.collapsedInput}>
            <Input
              className={classes.inputMargin}
              id="deposit-amount"
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
            />
            <Button className={classes.button}>Adicionar</Button>
          </Collapse>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={3}
          elevation={6}
          component={Paper}
          square
          className={classes.pigBank}
        >
          <img className={classes.image} alt="trasnfer" src={pigbank} />
          <Box className={classes.boxSkin}>
            <Typography
              component="h3"
              variant="h5"
              className={classes.typography}
            >
              Meu Saldo
            </Typography>
            <Typography
              component="h2"
              variant="h5"
              className={classes.typography}
            >
              R$ 5.000,00
            </Typography>
            <Typography variant="subtitle1" className={classes.typography}>
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
        sm={12}
        md={12}
        className={clsx([classes.marginTop, classes.gridHeigh])}
      >
        <List className={classes.list}>
          <ListItem>
            <ListItemAvatar>
              <img
                className={classes.thumbnail}
                alt="transfer"
                src={transfer}
              />
            </ListItemAvatar>
            <ListItemText primary="Transferido foi" />
            <ListItemText
              className={classes.listItem}
              primary=" - $ 10,00"
              secondary="Jan 9, 2020 - 09:40"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemAvatar>
              <img className={classes.thumbnail} alt="received" src={cheers} />
            </ListItemAvatar>
            <ListItemText primary="Recebido" />
            <ListItemText
              className={classes.listItem}
              primary="$ 100,00"
              secondary="Jan 9, 2020 - 10:06"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemAvatar>
              <img className={classes.thumbnail} alt="transfer" src={wallet} />
            </ListItemAvatar>
            <ListItemText primary="Estornado" />
            <ListItemText
              className={classes.listItem}
              primary="$5,00"
              secondary="Jan 9, 2020 - 15:00"
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default Launch;
