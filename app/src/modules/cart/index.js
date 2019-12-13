import React, { useContext, Fragment, useState } from "react";
import CartContext from "../shop/context";
import CartItem from "../admin/carts/components/CartItem";
import { CARTS_API } from "../common/constants";
import TableHeader from "../common/TableHeader";
import UpdateCodeButton from "./components/UpdateCodeButton";
import useSWR from "swr";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const Cart = props => {
  const cart = useContext(CartContext);
  const { data } = useSWR(cart ? `${CARTS_API}/${cart.id}` : null);
  const [isValidated, setIsValidated] = useState(false);
  const { onCartValidate } = props;

  const handleValidateCart = async () => {
    await axios.post(`${CARTS_API}/${cart.id}/validate`, {});
    setIsValidated(true);
    onCartValidate(null);
  };

  return (
    <Fragment>
      <TableHeader
        title="Your cart"
        text="Here a list of items selected in your cart. You can provide a discount code before proceed to checkout."
      />
      {data && !isValidated ? (
        <CartItem
          cart={data}
          isSingleCart
          renderAddDiscountCell={<UpdateCodeButton cart={data} />}
        />
      ) : null}
      {!isValidated && (
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleValidateCart}
          >
            validate cart
          </Button>
        </Box>
      )}
      {isValidated && (
        <Typography variant="body1">Cart has been validated</Typography>
      )}
    </Fragment>
  );
};

export default Cart;
