import React, { Fragment, useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import CartBadge from "./components/CartBadge";
import CartContext from "../shop/context";

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
  const cart = useContext(CartContext);

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
          <nav>
            <Link
              component={RouterLink}
              to="/cart"
              variant="button"
              color="inherit"
              href="#"
            >
              <CartBadge items={cart ? cart.products.length : "0"} />
            </Link>
            {renderCta()}
          </nav>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </Fragment>
  );
};

export default MainLayout;
