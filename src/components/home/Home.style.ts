import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  box: {
    color: "#275F40",
    display: "flex",
    minHeight: "90px",
    position: "relative",
    cursor: "pointer",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  transferGrid: {
    backgroundColor: "#FAFAFA",
  },
  pigBank: {
    display: "flex",
    color: "#275F40",
    maxHeight: "155px",
    minHeight: "155px",
    margin: "5% 0 10%",
    [theme.breakpoints.up(600)]: {
      marginLeft: "5%",
    },
    "& img": {
      margin: "0 5% 0 0",
    },
    "& h3": {
      [theme.breakpoints.down(800)]: {
        fontSize: "1.3rem",
      },
    },
    "& h2": {
      [theme.breakpoints.down(800)]: {
        fontSize: "1.1rem",
      },
    },
  },
  depositTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  collapsedInput: {
    backgroundColor: "white",
  },
  inputMargin: {
    margin: "15px 15px",
  },
  inputWidth: {
    width: "90%",
  },
  gridHeigh: {
    maxHeight: "30%",
    justifyContent: "center",
    borderBottom: "1px solid #D2CDD1",
    margin: "25px 5%",
  },
  typography: {
    fontWeight: "bold",
    marginTop: "20px",
  },
  saldo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginTop: "15px",
  },
  saldoInfo: {
    fontSize: "1.2rem",
    marginTop: "5px",
  },
  date: {
    color: "#9C9696",
    marginTop: "30%",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
