import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import useFetch from '../../helpers/Hooks/useFetch';
import useForm from '../../helpers/Hooks/useForm';
import Error from '../error/Error';
import Logo from '../logo/Logo';
import useStyles from './PasswordReset.style';
import EFieldForm from '../../Enums/EFieldForm';
import { useHistory } from 'react-router-dom';
import { RESET_PASSWORD } from '../../APIs/APIAuth';

export default function ConfirmPassword() {
  const classes = useStyles();
  const history = useHistory();

  const { loading, error, request } = useFetch();
  const password = useForm(EFieldForm.password);
  const confirmPassword = useForm(EFieldForm.password);
  const token = useForm(EFieldForm.text);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return null;

    if (
      (password.validate(),
      password.value === confirmPassword.value,
      token.validate())
    ) {
      //const { url, options } = RESET_PASSWORD(
      //  {
      //    password: password.value,
      //    token: token.value,
      //  },
      //  'uid',
      //  token.value,
      //);
      //const { response } = await request(url, options);
      //if (response?.ok) return history.push('/login');
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid xs={12} className={classes.main}>
        <Paper className={classes.paper} elevation={6} square>
          <Logo />
          <br></br>
          <Typography component="h1" variant="h5">
            Defina sua nova senha
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              {...password}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmarSenha"
              label="Confirmar Senha"
              type="password"
              id="confirmarSenha"
              {...confirmPassword}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="token"
              label="Token"
              type="text"
              id="token"
              {...token}
            />
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
                'CADASTRAR NOVA SENHA'
              )}
            </Button>
            <Error error={error} />
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
