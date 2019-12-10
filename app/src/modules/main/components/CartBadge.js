import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

const StyleBadge = withStyles(theme => ({
  badge: {
    right: -3,
    padding: "0 4px"
  }
}))(Badge);

const CartBadge = props => {
  const { items } = props;
  return (
    <Box display="inline">
      <IconButton aria-label="cart">
        <StyleBadge badgeContent={items} color="error">
          <ShoppingCartIcon />
        </StyleBadge>
      </IconButton>
    </Box>
  );
};

export default CartBadge;
