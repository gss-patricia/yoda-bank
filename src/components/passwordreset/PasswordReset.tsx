import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import LocalStorageActions from '../../store/actions/LocalStorageActions';
import UserActions from '../../store/actions/UserActions';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import useFetch from '../../helpers/Hooks/useFetch';
import { useHistory, Link } from 'react-router-dom';
import useForm from '../../helpers/Hooks/useForm';
import Error from '../error/Error';
import Logo from '../logo/Logo';
import useStyles from './PasswordReset.style';

export default function ResetPassword() {
  const classes = useStyles();
  const { loading, request } = useFetch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} className={classes.main}>
        <Paper className={classes.paper} elevation={6} square>
          <Logo />
          <Typography component="h1" variant="h5">
            Problemas para entrar?
          </Typography>
          <Typography component="h1" variant="body2">
            Insira seu e-mail e enviaremos um link para você voltar a acessar a
            conta.
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Link to="#">Esqueceu a senha?</Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {loading ? (
                <CircularProgress size={24} color="secondary" />
              ) : (
                'ENVIAR LINK PARA LOGIN'
              )}
            </Button>
            <Error error={''} />
            <Grid container className={classes.link}>
              <Grid item>
                <Link to="/login">{'Já sou da força'}</Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
