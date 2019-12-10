import React, { useContext, Fragment } from "react";
import CartContext from "../shop/context";
import CartItem from "../admin/carts/components/CartItem";
import { CARTS_API } from "../common/constants";
import TableHeader from "../common/TableHeader";
import useSWR from "swr";

const Cart = props => {
  const cart = useContext(CartContext);
  const { data } = useSWR(cart ? `${CARTS_API}/${cart.id}` : null);

  return (
    <Fragment>
      <TableHeader
        title="Your cart"
        text="Here a list of items selected in your cart. You can provide a discount code before proceed to checkout."
      />{" "}
      {data ? <CartItem cart={data} /> : null}
    </Fragment>
  );
};

export default Cart;
