import React from "react";
import { TextField, Select } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { guid } from "../../../../helpers/utils";

const AddProductForm = props => {
  const { bindSubmitForm, onSubmit, initialValues, discounts } = props;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        onSubmit({ ...values, ...{ discount: values.discount || null } });
      }}
    >
      {({ submitForm }) => {
        bindSubmitForm(submitForm);
        return (
          <Form>
            <Field
              type="text"
              name="name"
              label="name"
              data-test="add-product-name"
              required
              disabled={false}
              component={TextField}
              fullWidth
              margin="dense"
            />
            <Field
              type="text"
              name="description"
              label="description"
              data-test="add-product-desc"
              required
              disabled={false}
              component={TextField}
              fullWidth
              margin="dense"
            />
            <Field
              type="number"
              name="price"
              label="price"
              data-test="add-product-price"
              required
              disabled={false}
              component={TextField}
              fullWidth
              margin="dense"
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="discount">discount</InputLabel>
              <Field
                name="discount"
                label="discount"
                data-test="add-product-discount"
                disabled={false}
                component={Select}
                inputProps={{
                  id: "discount"
                }}
              >
                {[{ name: "none", _id: "" }, ...discounts].map(
                  ({ _id, name }) => (
                    <MenuItem key={guid()} value={_id}>
                      {name}
                    </MenuItem>
                  )
                )}
              </Field>
            </FormControl>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProductForm;
