import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  menu: {
    cursor: "pointer",
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = () => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, left: !state.left });
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        <ListItem button key="page-home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Link className={clsx(classes.link)} to="/">
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem button key="page-register">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link to="register" className={clsx(classes.link)}>
            <ListItemText primary="Nova Conta" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem button key="page-deposit">
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <Link to="deposit" className={clsx(classes.link)}>
            <ListItemText primary="Depósitos" />
          </Link>
        </ListItem>
        <Divider />
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key="left">
        <Button onClick={toggleDrawer()}>
          <MenuIcon className={clsx(classes.menu)} />
        </Button>
        <Drawer anchor="left" open={state.left} onClose={toggleDrawer()}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
