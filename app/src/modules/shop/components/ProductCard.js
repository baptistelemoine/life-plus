import React, { Fragment, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import AddToCartForm from "../forms/AddToCartForm";

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardContent: {
    flexGrow: 1
  },
  price: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center"
  },
  discount: {
    marginTop: "20px",
    fontSize: "14px"
  }
}));

const renderDiscountText = discount => {
  if (discount.type === "percent") {
    return `Get ${discount.percent}% off for this product!`;
  }
  return `Buy ${discount.buy_pay[0]} and pay for ${discount.buy_pay[1]}!`;
};

const renderPrice = (price, discount) => {
  if (discount && discount.type === "percent") {
    return (
      <Fragment>
        <Box mr={1}>
          <Typography color="textSecondary" mr={2}>
            <strike>{price}</strike>
          </Typography>
        </Box>
        {computeNewPrice(price, discount).toFixed(2)} €
      </Fragment>
    );
  } else return <Fragment>{price} €</Fragment>;
};

const computeNewPrice = (price, discount) => {
  return price - price * (discount.percent / 100);
};

const ProductCard = props => {
  const classes = useStyles();
  const {
    name,
    description,
    price,
    discount,
    id,
    onAddToCart,
    isSaving
  } = props;

  const handleSubmit = values => {
    onAddToCart(id, values);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography>{description}</Typography>
        <Typography className={classes.price} variant="h5" color="secondary">
          {renderPrice(price, discount)}
        </Typography>
        {discount && (
          <Typography className={classes.discount} color="error">
            {renderDiscountText(discount)}
          </Typography>
        )}
      </CardContent>
      {!isSaving ? (
        <AddToCartForm onSubmit={handleSubmit} />
      ) : (
        <Box p={3}>
          <Typography color="primary">Saving to cart...</Typography>
        </Box>
      )}
    </Card>
  );
};

export default ProductCard;
