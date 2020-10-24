import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import transfer from '../../assets/transfer.svg';
import wallet from '../../assets/wallet.svg';
import cheers from '../../assets/hacker.svg';
import { ExtratoConta } from '../../store/reducers/userReducers';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F3EFF5',
  },
  image: {
    width: '50%',
    marginLeft: '-18px',
  },
  list: {
    backgroundColor: 'white',
    width: '100%',
  },
  listItem: {
    textAlign: 'right',
  },
  thumbnail: {
    width: '100px',
  },
}));

interface IProps {
  extrato: ExtratoConta[];
}

const Extract = (props: IProps) => {
  const classes = useStyles();

  function renderAvatar(descricaoOperacao: string) {
    switch (descricaoOperacao) {
      case 'DEPOSITO':
        return [
          <img className={classes.thumbnail} alt="Depósito" src={cheers} />,
          <ListItemText primary="Depósito recebido" />,
        ];
      case 'SAQUE':
        return [
          <img className={classes.thumbnail} alt="Saque" src={wallet} />,
          <ListItemText primary="Saque realizado" />,
        ];
      case 'TRANSFERENCIA_ORIGEM':
        return [
          <img className={classes.thumbnail} alt="Saque" src={transfer} />,
          <ListItemText primary="Transferência realizada" />,
        ];
      case 'TRANSFERENCIA_DESTINO':
        return [
          <img className={classes.thumbnail} alt="Saque" src={wallet} />,
          <ListItemText primary="Transferência recebida" />,
        ];
      default:
        return [];
    }
  }

  function formatDate(
    year: number,
    month: number,
    day: number,
    hours: number,
    minutes: number,
    seconds: number,
  ) {
    if (day !== 0)
      return new Date(
        year,
        month,
        day,
        hours,
        minutes,
        seconds,
      ).toLocaleString();
  }

  return (
    <List className={classes.list}>
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
                primary={` - ${extratoResult.valor}`}
                secondary={formatDate(
                  extratoResult.timestamp.year,
                  extratoResult.timestamp.month,
                  extratoResult.timestamp.day,
                  extratoResult.timestamp.hours,
                  extratoResult.timestamp.minutes,
                  extratoResult.timestamp.seconds,
                )}
              />
            </ListItem>
            <Divider />
          </>
        );
      })}
    </List>
  );
};

export default Extract;
