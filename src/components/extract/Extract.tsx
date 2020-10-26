import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import transfer from "../../assets/transfer.svg";
import wallet from "../../assets/wallet.svg";
import cheers from "../../assets/hacker.svg";
import { ExtratoConta } from "../../store/reducers/userReducers";
import useStyles from "./Extract.style";
import { useDispatch, useSelector } from "react-redux";
import { GET_EXTRATO } from "../../APIs/APIConta";
import useFetch from "../../helpers/Hooks/useFetch";
import UserAction from "../../store/actions/UserActions";

const Extract = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { loading, error, request } = useFetch();

  const { userReducers }: any = useSelector((state) => state);
  const { localStorageReducers }: any = useSelector((state) => state);

  const { yoToken, yoUuid } = localStorageReducers;
  const { extrato } = userReducers;

  useEffect(() => {
    getExtrato();
  }, []);

  const getExtrato = async (page: number = 0) => {
    if (!yoUuid) return null;

    //TODO: Verificar com o backend para remover a query de data, poruqe a api ja está paginada
    const startDate = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() - 15);

    const { url, options } = GET_EXTRATO(yoUuid, yoToken, page);
    const { response, json } = await request(url, options);
    if (response?.ok) {
      setCurrentPage(json.number); //TODO: Informar o backend para iniciar as pages com 1
      setTotalPages(json.totalPages);
      dispatch({
        type: UserAction.SET_EXTRATO,
        payload: {
          extrato: json.content.map((extrato: ExtratoConta) => extrato),
        },
      });
    }
  };

  function renderAvatar(descricaoOperacao: string) {
    switch (descricaoOperacao) {
      case "DEPOSITO":
        return [
          <img className={classes.thumbnail} alt="Depósito" src={cheers} />,
          <ListItemText primary="Depósito realizado" />,
        ];
      case "SAQUE":
        return [
          <img className={classes.thumbnail} alt="Saque" src={wallet} />,
          <ListItemText primary="Saque realizado" />,
        ];
      case "TRANSFERENCIA_ORIGEM":
        return [
          <img className={classes.thumbnail} alt="Saque" src={transfer} />,
          <ListItemText primary="Transferência realizada" />,
        ];
      case "TRANSFERENCIA_DESTINO":
        return [
          <img className={classes.thumbnail} alt="Saque" src={wallet} />,
          <ListItemText primary="Transferência recebida" />,
        ];
      default:
        return [];
    }
  }

  function formatDate(timestamp: any) {
    if (timestamp) {
      const date = new Date(timestamp).toLocaleString();
      return date;
    }
  }

  async function handlePage(event: React.ChangeEvent<any>, value: number) {
    setPrevPage(value - 1);
    await getExtrato(value - 1);
  }

  function renderPagination() {
    return (
      <Pagination
        className={classes.page}
        count={totalPages}
        color="primary"
        onChange={handlePage}
      />
    );
  }

  if (extrato.length === 0)
    return (
      <>
        <Typography variant="h5" color="primary" className={classes.text}>
          Não há movimentações realizadas
        </Typography>
      </>
    );
  return (
    <>
      <Typography variant="h5" color="primary" className={classes.text}>
        Meus lançamentos
      </Typography>
      <Grid
        xs={12}
        md={12}
        elevation={6}
        component={Paper}
        square
        className={classes.paper}
      >
        {renderPagination()}
        {extrato.length > 0 && (
          <List className={`${classes.list} ${classes.paper}`}>
            {extrato.map((extratoResult: any) => {
              return (
                <>
                  <ListItem key={extratoResult.id}>
                    <ListItemAvatar className={classes.image}>
                      {renderAvatar(extratoResult.descricaoOperacao)[0]}
                    </ListItemAvatar>
                    {renderAvatar(extratoResult.descricaoOperacao)[1]}
                    <ListItemText
                      className={classes.listItem}
                      primary={extratoResult.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                      secondary={formatDate(extratoResult.timestamp)}
                    />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        )}
        {renderPagination()}
      </Grid>
    </>
  );
};

export default Extract;
