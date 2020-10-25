import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Grid,
  Paper,
} from "@material-ui/core";
import transfer from "../../assets/transfer.svg";
import wallet from "../../assets/wallet.svg";
import cheers from "../../assets/hacker.svg";
import { ExtratoConta } from "../../store/reducers/userReducers";
import useStyles from "./Extract.style";

interface IProps {
  extrato: ExtratoConta[];
}

const Extract = (props: IProps) => {
  const classes = useStyles();

  function renderAvatar(descricaoOperacao: string) {
    switch (descricaoOperacao) {
      case "DEPOSITO":
        return [
          <img className={classes.thumbnail} alt="Depósito" src={cheers} />,
          <ListItemText primary="Depósito recebido" />,
        ];
      case "SAQUE":
        return [
          <img className={classes.thumbnail} alt="Saque" src={wallet} />,
          <ListItemText primary="Saque realizado" />,
        ];
      case "TRANSFERENCIA_ORIGEM":
        return [
          <img className={classes.thumbnail} alt="Saque" src={transfer} />,
          <ListItemText primary="Transferência realizada" />,
        ];
      case "TRANSFERENCIA_DESTINO":
        return [
          <img className={classes.thumbnail} alt="Saque" src={wallet} />,
          <ListItemText primary="Transferência recebida" />,
        ];
      default:
        return [];
    }
  }

  function formatDate(timestamp: any) {
    if (timestamp) {
      const date = new Date(timestamp).toLocaleString();
      return date;
    }
  }

  return (
    <>
      <Grid
        xs={12}
        md={12}
        elevation={6}
        component={Paper}
        square
        className={classes.paper}
      >
        {props.extrato.length > 0 && (
          <List className={`${classes.list} ${classes.paper}`}>
            {props.extrato.map((extratoResult) => {
              return (
                <>
                  <ListItem key={extratoResult.id}>
                    <ListItemAvatar>
                      {renderAvatar(extratoResult.descricaoOperacao)[0]}
                    </ListItemAvatar>
                    {renderAvatar(extratoResult.descricaoOperacao)[1]}
                    <ListItemText
                      className={classes.listItem}
                      primary={extratoResult.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                      secondary={formatDate(extratoResult.timestamp)}
                    />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        )}
      </Grid>
    </>
  );
};

export default Extract;
