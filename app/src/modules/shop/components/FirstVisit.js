import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  mainContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  actionButtons: {
    marginTop: theme.spacing(4)
  }
}));

const FirstVisit = props => {
  const classes = useStyles();
  return (
    <div className={classes.mainContent}>
      <Container maxWidth="sm">
        <Typography
          component="h2"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          LifePlus Challenge
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          paragraph
        >
          <p>Seems it is your first visit here.</p>
          <p>
            Hope you'll enjoy browsing the app the same i enjoyed building it!
          </p>
          <p>
            You can browse the app using navigation bar in the top right of the
            app
          </p>
          <p>
            Database is empty from now, start browsing admin area to add
            products, discounts and codes, then come back here and start your
            shopping!
          </p>
        </Typography>
        <div className={classes.actionButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Link component={RouterLink} to="/admin">
                <Button variant="contained" color="primary">
                  Go to admin area
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default FirstVisit;
