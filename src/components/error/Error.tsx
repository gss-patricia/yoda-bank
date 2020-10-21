import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

//TODO: Fazer o componente de erro
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

interface IProps {
  error: string;
}

const Error = (props: IProps) => {
  const classes = useStyles();

  if (!props.error) return null;
  return (
    <div className={classes.root}>
      <Alert variant="filled" severity="error">
        {props.error}
      </Alert>
    </div>
  );
};

export default Error;
