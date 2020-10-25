import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "70px",
  },
  headerWrapper: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
  },
  paper: {
    display: "flex",
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "70px",
    width: "30%",
    "& h1": {
      marginLeft: "5%",
    },
  },
  paperSecond: {
    display: "flex",
    flexDirection: "row",
    color: "white",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "70px",
    padding: theme.spacing(2),
    width: "70%",
  },
  logout: {
    width: "50px",
    marginLeft: "10px",
    backgroundColor: "#4C2A85",
  },
  logo: {
    marginRight: "20px",
  },
  width: {
    minWidth: "100%",
  },
}));

export default useStyles;
