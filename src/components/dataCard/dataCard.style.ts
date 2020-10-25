import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  box: {
    color: "#275F40",
    display: "flex",
    cursor: "pointer",
    justifyContent: "start",
    minHeight: "155px",
    backgroundColor: "#FAFAFA",
    [theme.breakpoints.down(400)]: {
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50px",
    },
    [theme.breakpoints.up(400)]: {
      position: "relative",
    },
    "& h3": {
      [theme.breakpoints.up(400)]: {
        position: "absolute",
        right: "10px",
      },
    },
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
  dataGrid: {
    justifyContent: "center",
    [theme.breakpoints.up(880)]: {
      justifyContent: "start",
    },
  },
  typography: {
    fontWeight: "bold",
    marginTop: "20px",
    [theme.breakpoints.down(800)]: {
      fontSize: "1.3rem",
    },
  },
  image: {
    minWidth: "191px",
    [theme.breakpoints.down(400)]: {
      opacity: "0",
      position: "absolute",
    },
  },
  personal_info: {
    display: "flex",
    color: "#275F40",
    maxHeight: "155px",
    minHeight: "155px",
    margin: "5% 0 10%",
    alignItems: 'center',
    borderRadius: '10px',
    "& img": {
      margin: "0 5% 0 0",
    },
    [theme.breakpoints.up(767)]: {
        marginBottom: '5%',
        marginTop: "2%",
    },
    "& h2": {
      [theme.breakpoints.down(800)]: {
        fontSize: "0.7rem",
      },
    },
    "& div": {
      [theme.breakpoints.between(600,768)]: {
        marginLeft: '5%',
      }
    },
  },
  paragraph: {
    fontSize: ".8rem",
    [theme.breakpoints.down(1020)]: {
      fontSize: ".8rem",
    },
  },
  strong: {
    fontSize: "1.0rem",
    marginTop: "2px",
    fontWeight: "bold",
    [theme.breakpoints.down(1020)]: {
      fontSize: ".8rem",
    },
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "5px",
  },
  avatar: {
    marginLeft: "25px",
    marginRight: "35px",
    marginTop: "10px",
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.down(880)]: {
      opacity: "0",
      position: "absolute",
    },
  },
  widthBox: {
    [theme.breakpoints.between(425,600)]: {
      width: '80%',
    }
  }
}));

export default useStyles;
