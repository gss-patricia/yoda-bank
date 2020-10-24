import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#F3EFF5",
  },
  button: {
    color: "#275F40",
    fontSize: "1rem",
    padding: "5px 15px",
    fontWeight: "bold",
    margin: "15px 0 15px 7%",
  },
  image: {
    width: "50%",
    marginLeft: "-18px",
  },
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
  },
  transferGrid: {
    backgroundColor: "#FAFAFA",
  },
  typography: {
    fontWeight: "bold",
    marginTop: "20px",
  },
  addIcon: {
    position: "absolute",
    marginTop: "113px",
    right: "35px",
  },
  cheers: {
    width: "100px",
  },
}));

export default useStyles;
