import React, { useState, useContext } from "react";
import ProductCard from "./components/ProductCard";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";
import { PRODUCTS_API, CARTS_API } from "../common/constants";
import { guid } from "../../helpers/utils";
import CartContext from "./context";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  }
}));

const Shop = props => {
  const classes = useStyles();
  const { onCartUpdate } = props;
  const { data } = useSWR(PRODUCTS_API);
  const cart = useContext(CartContext);
  const [isSaving, setIsSaving] = useState(false);
  const [product, setProduct] = useState();

  const handleAddToCart = async (productId, quantity) => {
    setIsSaving(true);
    setProduct(productId);
    const products = {
      products: [
        ...(cart ? cart.products : []),
        { ...quantity, product: productId }
      ]
    };
    if (cart) {
      await axios
        .put(`${CARTS_API}/${cart._id}`, products)
        .then(({ data }) => onCartUpdate(data));
    } else
      await axios
        .post(`${CARTS_API}`, products)
        .then(({ data }) => onCartUpdate(data));

    // simulate saving cart for UX purpose
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data &&
          data.map(({ name, description, price, discount, _id }) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={guid()}>
                <ProductCard
                  name={name}
                  description={description}
                  price={price}
                  discount={discount}
                  id={_id}
                  onAddToCart={handleAddToCart}
                  isSaving={product === _id && isSaving}
                />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Shop;
