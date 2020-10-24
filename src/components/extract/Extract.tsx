import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import transfer from "../../assets/transfer.svg";
import wallet from "../../assets/wallet.svg";
import cheers from "../../assets/hacker.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F3EFF5",
  },
  image: {
    width: "50%",
    marginLeft: "-18px",
  },
  list: {
    backgroundColor: "white",
    width: "100%",
  },
  listItem: {
    textAlign: "right",
  },
  thumbnail: {
    width: "100px",
  },
}));

const Extract = () => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem>
        <ListItemAvatar>
          <img className={classes.thumbnail} alt="transfer" src={transfer} />
        </ListItemAvatar>
        <ListItemText primary="Transferido foi" />
        <ListItemText
          className={classes.listItem}
          primary=" - $ 10,00"
          secondary="Jan 9, 2020 - 09:40"
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemAvatar>
          <img className={classes.thumbnail} alt="received" src={cheers} />
        </ListItemAvatar>
        <ListItemText primary="Recebido" />
        <ListItemText
          className={classes.listItem}
          primary="$ 100,00"
          secondary="Jan 9, 2020 - 10:06"
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemAvatar>
          <img className={classes.thumbnail} alt="transfer" src={wallet} />
        </ListItemAvatar>
        <ListItemText primary="Estornado" />
        <ListItemText
          className={classes.listItem}
          primary="$5,00"
          secondary="Jan 9, 2020 - 15:00"
        />
      </ListItem>
    </List>
  );
};

export default Extract;
