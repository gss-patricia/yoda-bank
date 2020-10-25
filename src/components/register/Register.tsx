import React from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  CircularProgress,
} from '@material-ui/core/';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CREATE_CONTA } from '../../APIs/APIConta';
import RegisterBackground from '../../assets/background.svg';
import useForm from '../../helpers/Hooks/useForm';
import EFieldForm from '../../Enums/EFieldForm';
import useFetch from '../../helpers/Hooks/useFetch';
import Error from '../../components/error/Error';
import { EPerfil } from '../../Interfaces/IUser';
import Logo from '../logo/Logo';
import useStyles from './Register.style';

export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory();

  const { loading, error, request } = useFetch();
  const name = useForm(EFieldForm.text);
  const email = useForm(EFieldForm.email);
  const cpfCNPJ = useForm(EFieldForm.cnpj);
  const password = useForm(EFieldForm.password);
  const confirmPassword = useForm(EFieldForm.password);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return null;

    if (
      (name.validate(),
      email.validate(),
      cpfCNPJ.validate(),
      password.validate(),
      password.value === confirmPassword.value)
    ) {
      //TODO: Solicitar ao backend a validação de senha/confirmar senha
      //TODO: Será possivel qualquer um adicionar perfil adm ?
      const { url, options } = CREATE_CONTA({
        nome: name.value,
        email: email.value,
        cnpj: cpfCNPJ.value,
        senha: password.value,
        perfil: EPerfil.USER ? 'USER' : 'ADMIN',
      });

      const { response } = await request(url, options);
      if (response?.ok) return history.push('/login');
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>

        <div className={classes.paper}>
          <Logo />
          <Typography component="h1" variant="h5">
            Você para a força, deve entrar
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              {...name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cpfCNPJ"
              label="CPF/CNPJ"
              name="cpfCNPJ"
              {...cpfCNPJ}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="current-password"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={`${classes.submit}`}
            >
              {loading ? (
                <CircularProgress size={24} color="secondary" />
              ) : (
                'CADASTRAR'
              )}
            </Button>
            <Error error={error} />
            <Grid container className={classes.link}>
              <Grid item>
                <Link to="/login">{'Já sou da força'}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        className={`${classes.imageRegister}`}
      >
        <div className={classes.overlay}>
          <div className={classes.boxPhrase}>
            <Typography
              component="h1"
              variant="h2"
              className={classes.mainPhrase}
            >
              Faça ou não
              <br />
              faça,
              <br />
              tentativa não <br />
              há!
            </Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
