import React, { memo } from "react";
import {
  Grid,
  Paper,
  CssBaseline,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LocalStorageActions from "../../store/actions/LocalStorageActions";
import UserAction from "../../store/actions/UserActions";
import Logo from "../../assets/logo-white.svg";
import ToggleDrawer from "../toggleDrawer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useStyles from "./Header.style";

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:1000px)");
  const history = useHistory();

  const { userReducers }: any = useSelector((state) => state);

  async function remove() {
    dispatch({
      type: LocalStorageActions.REMOVE_LOCAL_STORAGE,
      state: "",
    });
    dispatch({
      type: UserAction.SET_INITIAL,
    });
    history.push("/login");
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={12}
        component={Paper}
        elevation={6}
        square
        className={classes.width}
      >
        <div className={classes.headerWrapper}>
          <Box className={classes.paper} width="50%">
            <ToggleDrawer />
            <img src={Logo} alt="Logo" width="45" />
            {matches && (
              <Typography component="h1" variant="h5">
                Yoda Coins Beer
              </Typography>
            )}
          </Box>
          <Box className={classes.paperSecond} width="50%">
            <p>
              Olá, <strong>{userReducers.nome}</strong>
            </p>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.logout}
              onClick={remove}
            >
              Sair
            </Button>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default memo(Header);
