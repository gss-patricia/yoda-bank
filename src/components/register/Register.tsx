import React from 'react';
import {Button, CssBaseline, TextField, Paper, Grid, Typography,} from '@material-ui/core/';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../assets/logo.svg';
import background from '../../assets/background.svg'
import './Register.css';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {   
    backgroundImage: `url(${background})`,
    opacity: 0.7,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.primary.main,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  link:{
    justifyContent: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },  
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },  
  boxPhrase: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  },  
  phrase: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: '60px',
    lineHeight: '62px',
    textAlign: 'center',
    color: '#FFFFFF',
  }  ,
  backGreen: {
    opacity: 0.8,
    backgroundColor: theme.palette.primary.main,  
    minHeight: '100%'  
  }  

}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={Logo} alt="Logo"/>
          <Typography component="h1" variant="h5">
            Você para a força, deve entrar
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome" 
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
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cpfCNPJ"
              label="CPF/CNPJ"
              name="cpfCNPJ" 
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={`${classes.submit}`}
            >
              CADASTRAR
            </Button>
            <Grid container className={classes.link}>
              <Grid item>
                <Link to={'/login'}>
                  {"Já sou da força"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid> 
      <Grid item xs={false} sm={4} md={7} className={`${classes.image}`}>
      <div className={classes.backGreen}>
          <div className={classes.boxPhrase}>
            <p className={classes.phrase}>
              Faça ou não<br/>
              faça,<br/>
              tentativa não <br/>
              há!
            </p>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}