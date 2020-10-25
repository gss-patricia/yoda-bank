import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  button: {
    color: "#275F40",
    fontSize: "1rem",
    padding: "5px 15px",
    fontWeight: "bold",
  },
  box: {
    color: "#275F40",
    display: "flex",
    cursor: "pointer",
    justifyContent: "start",
    minHeight: "155px",
    backgroundColor: "#FAFAFA",
    borderRadius: '10px',
    [theme.breakpoints.down(400)]: {
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50px",
    },
    [theme.breakpoints.up(400)]: {
      position: "relative",
    },
    [theme.breakpoints.between(600,768)]: {
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50px",
    },
    "& h3": {
      fontWeight: "bold",
      marginTop: "20px",
      [theme.breakpoints.down(800)]: {
        fontSize: "1.3rem",
      },
      [theme.breakpoints.down(400)]: {
        marginTop: '0',
      },
      [theme.breakpoints.between(600,768)]: {
        marginTop: '0',
      },
      [theme.breakpoints.between(768,1024)]: {
        position: 'absolute',
        right: '5%',
      },
    },
    "& img": {
      minWidth: "191px",
      [theme.breakpoints.down(400)]: {
        opacity: "0",
        position: "absolute",
      },
      [theme.breakpoints.between(600,768)]: {
        opacity: "0",
        position: "absolute",
      }
    }
  },
  marginBottom: {
    marginBottom: "30px",
  },
  collapsedInput: {
    padding: "5% 0",
  },
  inputMargin: {
    margin: "15px 15px",
    [theme.breakpoints.down(410)]: {
      width: "90%",
    },
    [theme.breakpoints.between(445, 600)]: {
      width: "57%",
    },
    [theme.breakpoints.between(601, 958)]: {
      width: "43%",
    },
    [theme.breakpoints.up(1024)]: {
      width: "48%",
    },
  },
  inputWidth: {
    width: "90%",
  },
  transferGrid: {
    backgroundColor: "#fff",
    borderRadius: '10px',
    [theme.breakpoints.up(600)]: {
      margin: "0 0 5%",
    },
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
