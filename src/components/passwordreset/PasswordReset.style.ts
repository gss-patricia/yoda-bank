import { makeStyles } from "@material-ui/core/styles";
import LoginBackground from '../../assets/login-background.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#F3EFF5',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 2, 4, 2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
  link: {
    justifyContent: 'center',
  },
  title: {
    margin: theme.spacing(2, 0),
  },
  boxPhrase: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',
    margin: theme.spacing(0, 10),
    textShadow: '0.5px 0.5px 1px #000',
    '@media (max-width: 955px)': {
      display: 'none',
    },
  },
  mainPhrase: {
    fontWeight: 500,
    textAlign: 'center',
  },
  secundaryPhrase: { fontWeight: 700 },
}));

export default useStyles;