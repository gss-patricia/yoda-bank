import React, { useEffect, memo } from "react";
import { Grid, Box, Typography, Paper, Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import clsx from "clsx";
import useStyles from "./dataCard.style";

const DataCard = () => {
  const classes = useStyles();
  const { userReducers, localStorageReducers }: any = useSelector(
    (state) => state
  );
  const { yoUuid } = localStorageReducers;
  const { cnpj, email } = userReducers;

  useEffect(() => {}, []);

  return (
    
      <Grid
        md={5}
        sm={5}
        xs={12}
        elevation={6}
        component={Paper}
        square
        className={clsx([classes.personal_info, classes.dataGrid])}
      >
        <Avatar alt="Yodados" className={classes.avatar} />
        <Box className={classes.widthBox}>
          <Typography
            component="h3"
            variant="h5"
            className={`${classes.strong} ${classes.title}`}
          >
            YoDados
          </Typography>
          <Typography component="h3" variant="h5" className={classes.paragraph}>
            <strong className={classes.strong}>Yox: </strong>
            {`${yoUuid}`}
          </Typography>
          <Typography component="h3" variant="h5" className={classes.paragraph}>
            <strong className={classes.strong}>CNPJ: </strong>
            {`${cnpj}`}
          </Typography>
          <Typography component="h3" variant="h5" className={classes.paragraph}>
            <strong className={classes.strong}>E-mail: </strong>
            {`${email}`}
          </Typography>

          <Typography
            component="h2"
            variant="h5"
            className={clsx([classes.paragraph, classes.strong])}
          ></Typography>
        </Box>
      </Grid>
  );
};

export default memo(DataCard);
