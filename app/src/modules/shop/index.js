import React from "react";
import ProductCard from "./components/ProductCard";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";
import { PRODUCTS_API } from "../common/constants";
import { guid } from "../../helpers/utils";

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
  const { data } = useSWR(PRODUCTS_API);
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data &&
          data.map(({ name, description, price, discount }) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={guid()}>
                <ProductCard
                  name={name}
                  description={description}
                  price={price}
                  discount={discount}
                />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Shop;
