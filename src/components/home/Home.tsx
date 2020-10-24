import React, { useEffect } from 'react';
import {
  Grid,
  CssBaseline,
  Box,
  Typography,
  Paper,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import pigbank from '../../assets/pigbank.svg';
import LayoutBase from '../../components/layout';
import clsx from 'clsx';
import TransferCard from '../transferCard';
import Extract from '../extract';
import UserAction from '../../store/actions/UserActions';
import useFetch from '../../helpers/Hooks/useFetch';
import { GET_SALDO } from '../../APIs/APIConta';
import IUser from '../../Interfaces/IUser';
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F3EFF5',
  },
  button: {
    color: '#275F40',
    fontSize: '1rem',
    padding: '5px 15px',
    fontWeight: 'bold',
    margin: '15px 0 15px 7%',
  },
  image: {
    width: '50%',
    marginLeft: '-18px',
  },
  box: {
    color: '#275F40',
    display: 'flex',
    minHeight: '90px',
    position: 'relative',
    cursor: 'pointer',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  marginTop: {
    marginTop: '50px',
  },
  transferGrid: {
    backgroundColor: '#FAFAFA',
  },
  pigBank: {
    display: 'flex',
    maxHeight: '155px',
    color: '#275F40',
    marginLeft: '5%',
  },
  depositTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  collapsedInput: {
    backgroundColor: 'white',
  },
  inputMargin: {
    margin: '15px 15px',
  },
  inputWidth: {
    width: '90%',
  },
  gridHeigh: {
    maxHeight: '30%',
    justifyContent: 'center',
  },
  typography: {
    fontWeight: 'bold',
    marginTop: '20px',
  },
  saldo: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '15px',
  },
  saldoInfo: {
    fontSize: '1.2rem',
    marginTop: '5px',
  },
  date: {
    color: '#9C9696',
    marginTop: '30%',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Launch = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, request } = useFetch();

  const { localStorageReducers }: any = useSelector((state) => state);

  const user: IUser = jwt_decode(localStorageReducers.yoToken);
  useEffect(() => {
    dispatch({
      type: UserAction.SET_USER,
      payload: { user: user },
    });
  }, []);
  const { userReducers }: any = useSelector((state) => state);

  const { yoToken } = localStorageReducers;
  const { uuid, saldo } = userReducers;
  const date = new Date().toLocaleDateString();

  useEffect(() => {
    async function getSaldo() {
      if (!uuid) return null;
      const { url, options } = GET_SALDO(uuid, yoToken);
      const { response, json } = await request(url, options);
      if (response?.ok) {
        dispatch({
          type: UserAction.SET_SALDO,
          payload: {
            saldo: json.saldo,
          },
        });
      }
    }

    getSaldo();
  }, [userReducers]);

  return (
    <Grid
      container
      component="main"
      alignContent="flex-start"
      className={classes.root}
    >
      <CssBaseline />
      <LayoutBase>
        <>
          <Grid
            container
            alignContent="flex-start"
            justify="space-around"
            xs={12}
            sm={12}
            md={12}
            className={clsx([classes.marginTop, classes.gridHeigh])}
          >
            <TransferCard />
            <Grid
              xs={12}
              sm={6}
              md={3}
              elevation={6}
              component={Paper}
              square
              className={clsx([classes.pigBank, classes.transferGrid])}
            >
              <img className={classes.image} alt="trasnfer" src={pigbank} />
              <Box>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.saldo}
                >
                  Meu Saldo
                </Typography>
                <Typography
                  component="h2"
                  variant="h5"
                  className={clsx([classes.saldo, classes.saldoInfo])}
                >
                  {loading || error ? (
                    <CircularProgress size={24} color="secondary" />
                  ) : (
                    saldo.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  )}
                </Typography>
                <Typography variant="subtitle1" className={classes.date}>
                  {date}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider />
          <Grid
            container
            alignContent="flex-start"
            justify="center"
            xs={12}
            sm={6}
            md={12}
            className={clsx([
              classes.marginTop,
              classes.gridHeigh,
              classes.centered,
            ])}
          >
            <Grid xs={12} sm={4} md={7} elevation={6} component={Paper} square>
              <Extract />
            </Grid>
          </Grid>
        </>
      </LayoutBase>
    </Grid>
  );
};

export default Launch;
