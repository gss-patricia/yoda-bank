import React, { useState } from 'react';
import { 
  Grid, 
  CssBaseline, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Collapse, 
  InputAdornment,
  Input} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import wallet from '../../assets/wallet.svg'
import Header from '../header';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F3EFF5',
  },
  button: {
    color: '#275F40',
    fontSize: '1rem',
    padding: '5px 15px',
    fontWeight: 'bold',
    margin: '15px 0 15px 50%',
  },
  image: {
    margin: '0 5%',
    width: '90%',
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '90px',
    padding: '0 20px',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  marginTop: {
    marginTop: '50px',
  },
  depositTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  collapsedInput: {
    backgroundColor: '#F3EFF5',
  },
  inputMargin: {
    margin: '15px 15px',
  },
  gridHeigh: {
    minHeight: '84vh',
  }
}));


const Launch: React.FC = () => {
  const classes = useStyles();

  const [checked, setChecked] = useState(-1);

  const handleExpandClick = (i: number) => {
    setChecked(checked === i ? -1 : i);
  };

  return (
    <Grid container component="main" alignContent="flex-start" className={classes.root}>
      <CssBaseline />
      <Header />
      <Grid xs={12} sm={6} md={4} className={classes.marginTop}>
        <img className={classes.image} alt="wallet" src={wallet} />
      </Grid>
      <Grid 
        container 
        alignContent="flex-start" 
        justify="space-around" 
        xs={12} 
        sm={6} 
        md={8} 
        className={clsx([classes.marginTop, classes.gridHeigh])}
      >
        <Grid xs={12} sm={9} md={9} className={classes.marginBottom}>
          <Typography className={classes.depositTitle} component="h1" variant="h3">
            Depósitos
          </Typography>
        </Grid>
        <Grid 
          xs={12} 
          sm={9} 
          md={9} 
          elevation={6} 
          component={Paper} 
          square 
          className={classes.marginBottom}
        >
          <Box onClick={() => handleExpandClick(1)} className={classes.box}>
            <Typography component="h3" variant="h5">
              Conta 1
            </Typography>
          </Box>
          <Collapse in={checked === 1} className={classes.collapsedInput}>
            <Input className={classes.inputMargin} id="deposit-amount" startAdornment={<InputAdornment position="start">R$</InputAdornment>}/>
            <Button className={classes.button}>
              Adicionar
            </Button>
          </Collapse>
        </Grid>
        <Grid 
          xs={12} 
          sm={9} 
          md={9} 
          elevation={6} 
          component={Paper} 
          square 
          className={classes.marginBottom}
        >
          <Box 
            onClick={() => handleExpandClick(2)}
            className={classes.box}>
            <Typography component="h3" variant="h5">
              Conta 1
            </Typography>
          </Box>
          <Collapse in={checked === 2} className={classes.collapsedInput}>
            <Input className={classes.inputMargin} id="deposit-amount" startAdornment={<InputAdornment position="start">R$</InputAdornment>}/>
            <Button className={classes.button}>
              Adicionar
            </Button>
          </Collapse>
        </Grid>
        <Grid 
          xs={12} 
          sm={9} 
          md={9} 
          elevation={6} 
          component={Paper} 
          square 
          className={classes.marginBottom}
        >
          <Box 
            onClick={() => handleExpandClick(3)}
            className={classes.box}>
            <Typography component="h3" variant="h5">
              Conta 1
            </Typography>
          </Box>
          <Collapse in={checked === 3} className={classes.collapsedInput}>
            <Input className={classes.inputMargin} id="deposit-amount" startAdornment={<InputAdornment position="start">R$</InputAdornment>}/>
            <Button className={classes.button}>
              Adicionar
            </Button>
          </Collapse>
        </Grid>
        <Grid 
          xs={12} 
          sm={9} 
          md={9} 
          elevation={6} 
          component={Paper} 
          square 
          className={classes.marginBottom}
        >
          <Box 
            onClick={() => handleExpandClick(4)}
            className={classes.box}>
            <Typography component="h3" variant="h5">
              Conta 1
            </Typography>
          </Box>
          <Collapse in={checked === 4} className={classes.collapsedInput}>
            <Input className={classes.inputMargin} id="deposit-amount" startAdornment={<InputAdornment position="start">R$</InputAdornment>}/>
            <Button className={classes.button}>
              Adicionar
            </Button>
          </Collapse>
        </Grid>
        <Grid 
          xs={12} 
          sm={9} 
          md={9} 
          elevation={6} 
          component={Paper} 
          square 
          className={classes.marginBottom}
        >
          <Box 
            onClick={() => handleExpandClick(5)}
            className={classes.box}>
            <Typography component="h3" variant="h5">
              Conta 1
            </Typography>
          </Box>
          <Collapse in={checked === 5} className={classes.collapsedInput}>
            <Input className={classes.inputMargin} id="deposit-amount" startAdornment={<InputAdornment position="start">R$</InputAdornment>}/>
            <Button className={classes.button}>
              Adicionar
            </Button>
          </Collapse>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default Launch;