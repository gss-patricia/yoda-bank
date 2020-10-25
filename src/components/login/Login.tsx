import React, { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import LocalStorageActions from "../../store/actions/LocalStorageActions";
import UserActions from "../../store/actions/UserActions";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import EFieldForm from "../../Enums/EFieldForm";
import useFetch from "../../helpers/Hooks/useFetch";
import { AUTHENTICATE } from "../../APIs/APIAuth";
import { useHistory, Link } from "react-router-dom";
import useForm from "../../helpers/Hooks/useForm";
import Error from "../../components/error/Error";
import IUser from "../../Interfaces/IUser";
import Logo from "../logo/Logo";
import useStyles from "./Login.style";

const Login = () => {
  const [errorLogin, setErrorLogin] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LocalStorageActions.GET,
    });
  }, [dispatch]);

  const classes = useStyles();
  const history = useHistory();

  const { loading, request } = useFetch();
  const email = useForm(EFieldForm.email);
  const password = useForm(EFieldForm.text);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return null;

    if ((email.validate(), password.validate())) {
      const { url, options } = AUTHENTICATE({
        username: email.value,
        password: password.value,
      });

      const { response, json } = await request(url, options);
      if (response?.ok) {
        dispatch({
          type: LocalStorageActions.SAVE_LOCAL_STORAGE,
          state: json.token,
        });
        const user: IUser = jwt_decode(json.token);

        dispatch({
          type: UserActions.SET_USER,
          payload: { user: user },
        });
        history.push("/");
      } else {
        setErrorLogin("Usuário ou senha inválido");
      }
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.imageLogin}>
        <div className={classes.overlay}>
          <div className={classes.boxPhrase}>
            <Typography
              component="h1"
              variant="h1"
              className={classes.mainPhrase}
            >
              Bem vindo!
            </Typography>
            <Typography
              component="h1"
              variant="h4"
              className={classes.mainPhrase}
            >
              Em ver você, felizes estamos nós! Para sua conta bancária tenha
              acesso
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} className={classes.main}>
        <Paper className={classes.paper} elevation={6} square>
          <Logo />
          <Typography component="h1" variant="h5">
            Faça seu login
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
              {...email}
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
              {...password}
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
                "ENTRAR"
              )}
            </Button>
            <Error error={errorLogin} />
            <Grid container className={classes.link}>
              <Grid item>
                <Link to="/register">
                  {"Não tem um conta, entrar para força"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={3}>
              <Typography variant="body2" color="textSecondary" align="center">
                {"Desenvolvido para estudo no BeerTechTalents(2020) - "}
                <a
                  href="https://github.com/gss-patricia/yoda-coins-beertech"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default memo(Login);
