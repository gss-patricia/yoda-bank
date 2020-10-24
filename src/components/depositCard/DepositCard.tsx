import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  Collapse,
  InputAdornment,
  Input,
  Fab,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';

import wallet from '../../assets/wallet.svg';
import AlertDialog from '../dialog';
import composeRefs from '../../helpers/composeRefs';

const useStyles = makeStyles((theme) => ({
  button: {
    color: '#275F40',
    fontSize: '1rem',
    padding: '5px 15px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  image: {
    minWidth: '191px',
    width: '30%',
    [theme.breakpoints.down(400)]: {
      opacity: '0',
      position: 'absolute',
    },
  },
  box: {
    color: '#275F40',
    display: 'flex',
    cursor: 'pointer',
    justifyContent:'start',
    minHeight: '155px',
    backgroundColor: '#FAFAFA',
    [theme.breakpoints.down(400)]: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50px',
    },
    [theme.breakpoints.up(400)]: {
      position: 'relative',
    },
    "& h3": {
      [theme.breakpoints.up(400)]: {
        position: 'absolute',
        right: '10px',
      },
    }
  },
  marginBottom: {
    marginBottom: '30px',
  },
  collapsedInput: {
    padding: '5% 0',
    display: 'flex',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    [theme.breakpoints.down(600)]: {
      flexWrap: 'wrap',
      minHeight: 'auto',
    },
  },
  inputMargin: {
    margin: '15px 15px',
    [theme.breakpoints.down(410)]: {
      width: '90%',
    },
    [theme.breakpoints.between(445,600)]: {
      width: "57%",
    },
    [theme.breakpoints.between(601,958)]: {
      width: "43%",
    },
    [theme.breakpoints.up(1024)]: {
      width: "48%",
    },
  },
  inputWidth: {
    width: '90%',
  },
  transferGrid: {
    backgroundColor: '#fff',
    [theme.breakpoints.up(600)]: {
      margin: "0 0 5% 5%",
    },
  },
  typography: {
    fontWeight: 'bold',
    marginTop: '20px',
    [theme.breakpoints.down(800)]: {
      fontSize: '1.3rem',
    }
  },
  addIcon: {
    position: 'absolute',
    marginTop: '113px',
    right: '35px',
  },
}));

const Deposit = () => {
  const classes = useStyles();
  const [transferValue, setInputTransfer] = useState();
  const container = React.useRef();

  const handleDialog = (param: any) => console.log(param);

  const handleTransfer = (event: any) => {
    console.log(event.target.value);
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
        <Input
          className={classes.inputMargin}
          startAdornment={<InputAdornment position="start">R$</InputAdornment>}
          onChange={handleTransfer}
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
                Depositar
              </Button>
            </>
          )}
        </AlertDialog>
      </Box>
    </Grid>
  );
};

export default Deposit;
