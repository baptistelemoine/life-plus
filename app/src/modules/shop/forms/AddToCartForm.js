import React from "react";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  quantity: {
    maxWidth: "70px"
  },
  cardActions: {
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "20px"
  }
}));

const AddToCartForm = props => {
  const classes = useStyles();
  const { onSubmit } = props;
  return (
    <Formik
      initialValues={{ quantity: 1 }}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {() => {
        return (
          <Form>
            <CardActions className={classes.cardActions}>
              <Field
                className={classes.quantity}
                component={TextField}
                name="quantity"
                label="Quantity"
                type="number"
                disabled={false}
              />
              <Button size="small" color="primary" type="submit">
                add to cart
              </Button>
            </CardActions>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddToCartForm;
