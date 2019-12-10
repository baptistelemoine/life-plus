import React, { Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: "flex-end"
  }
}));

const routes = [
  { route: "/", label: "shop" },
  { route: "/admin", label: "admin" },
  { route: "/carts", label: "carts" }
];

const MainLayout = props => {
  const { children } = props;
  const classes = useStyles();
  const location = useLocation();

  const renderCta = () => {
    return routes
      .filter(({ route }) => route !== location.pathname)
      .map(({ route, label }) => (
        <Box ml={2} display="inline" key={route}>
          <Link
            component={RouterLink}
            to={route}
            variant="button"
            color="inherit"
            href="#"
          >
            {label}
          </Link>
        </Box>
      ));
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
