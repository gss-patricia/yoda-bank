import React from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import wallet from '../../assets/wallet.svg'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#F3EFF5',
  },

}));


const Launch: React.FC = () => {
  const classes = useStyles();


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid>
        <img alt="wallet" src={wallet} />
      </Grid>
      <Grid>

      </Grid>
    </Grid>
  )
};

export default Launch;