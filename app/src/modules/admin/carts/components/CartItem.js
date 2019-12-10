import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { guid } from "../../../../helpers/utils";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const renderDiscountText = discount => {
  if (!discount) return "";
  else if (discount.type === "percent") {
    return `Get ${discount.percent}% off for this product!`;
  } else if (discount.type === "buy_pay")
    return `Buy ${discount.buy_pay[0]} and pay for ${discount.buy_pay[1]}!`;
};

const renderSubTotal = cart => {
  return cart.products.reduce((a, b) => a + b.total, 0).toFixed(2);
};

const renderDiscountCode = ({ discount_code }) => {
  if (!discount_code) return "";
  if (discount_code.type === "fixed") return `${discount_code.value}`;
  else if (discount_code.type === "percent") return `${discount_code.value}%`;
};

const renderDiscountAmount = cart => {
  return (cart.total - renderSubTotal(cart)).toFixed(2);
};

const CartItem = props => {
  const classes = useStyles();
  const { cart } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products.map(row => (
            <TableRow key={guid()}>
              <TableCell>{row.product.name}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.product.price}</TableCell>
              <TableCell align="right">
                {renderDiscountText(row.product.discount)}
              </TableCell>
              <TableCell align="right">{row.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={4} />
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell align="right">{renderSubTotal(cart)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Discount code{" "}
              {cart.discount_code && `(${cart.discount_code.code})`}
            </TableCell>
            <TableCell align="right" colSpan={2}>
              {renderDiscountCode(cart)}
            </TableCell>
            <TableCell align="right">{renderDiscountAmount(cart)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>
              <Typography variant="h6">Total</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{cart.total.toFixed(2)}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CartItem;
