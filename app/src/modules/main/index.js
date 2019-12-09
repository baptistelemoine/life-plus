import React, { Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: "flex-end"
  }
}));

const MainLayout = props => {
  const { children } = props;
  const classes = useStyles();
  const location = useLocation();

  const renderCta = () => {
    if (location.pathname === "/admin") {
      return (
        <Link
          component={RouterLink}
          to="/"
          variant="button"
          color="inherit"
          href="#"
        >
          back to shop
        </Link>
      );
    }
    return (
      <Link
        component={RouterLink}
        to="/admin"
        variant="button"
        color="inherit"
        href="#"
      >
        admin
      </Link>
    );
  };

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
          <nav>{renderCta()}</nav>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </Fragment>
  );
};

export default MainLayout;
