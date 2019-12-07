import React, { Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: "flex-end"
  }
}));

const MainLayout = props => {
  const { children } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
          <nav>
            <Link variant="button" color="inherit" href="#">
              back to app
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </Fragment>
  );
};

export default MainLayout;
