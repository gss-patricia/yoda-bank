import React from 'react';
import { Grid, CssBaseline, Box, Typography, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import wallet from '../../assets/wallet.svg'
import Header from '../header';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#F3EFF5',
  },
  button: {
    color: '#275F40',
    fontSize: '1rem',
    padding: '5px 15px',
    fontWeight: 'bold',
  },
  image: {
    margin: '0 5%',
    width: '90%',
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    minHeight: '90px',
    padding: '0 20px',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  marginTop: {
    marginTop: '80px',
  },
  depositTitle: {
    marginTop: '40px',
    marginLeft: '50px',
    textAlign: 'center',
    fontWeight: 'bold',
  }
}));


const Launch: React.FC = () => {
  const classes = useStyles();


  return (
    <Grid container component="main" alignContent="flex-start" className={classes.root}>
      <CssBaseline />
      <Header />
      <Grid xs={12} sm={12} md={12}>
        <Typography className={classes.depositTitle} component="h1" variant="h3">
          Depósitos
        </Typography>
      </Grid>
      <Grid xs={12} sm={6} md={4} className={classes.marginTop}>
        <img className={classes.image} alt="wallet" src={wallet} />
      </Grid>
      <Grid container alignContent="flex-start" justify="space-around" xs={12} sm={6} md={8} className={classes.marginTop}>
        <Grid xs={12} sm={6} md={5} elevation={6} component={Paper} square className={classes.marginBottom}>
          <Box className={classes.box}>
            <Typography component="h3" variant="h5">
              Conta 1
            </Typography>
            <Button
              className={classes.button}
            >
              Adicionar
            </Button>
          </Box>
        </Grid>
        <Grid xs={12} sm={6} md={5} elevation={6} component={Paper} square className={classes.marginBottom}>
          <Box className={classes.box}>
            <Typography component="h3" variant="h5">
              Conta 1
            </Typography>
            <Button
              className={classes.button}
            >
              Adicionar
            </Button>
          </Box>
        </Grid>
        <Grid xs={12} sm={6} md={5} elevation={6} component={Paper} square className={classes.marginBottom}>
          <Box className={classes.box}>
            <Typography component="h3" variant="h5">
              Conta 1
            </Typography>
            <Button
              className={classes.button}
            >
              Adicionar
            </Button>
          </Box>
        </Grid>
        <Grid xs={12} sm={6} md={5} elevation={6} component={Paper} square className={classes.marginBottom}>
          <Box className={classes.box}>
            <Typography component="h3" variant="h5">
              Conta 1
            </Typography>
            <Button
              className={classes.button}
            >
              Adicionar
            </Button>
          </Box>
        </Grid>
        
        
      </Grid>
    </Grid>
  )
};

export default Launch;