import React, { Fragment } from "react";
import { TextField, Select } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { guid } from "../../../../helpers/utils";

const discountTypes = [
  {
    label: "Buy X pay Y",
    value: "buy_pay"
  },
  {
    label: "percent",
    value: "percent"
  }
];

const AddDiscountForm = props => {
  const { bindSubmitForm, onSubmit, initialValues } = props;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {({ submitForm, values }) => {
        bindSubmitForm(submitForm);
        return (
          <Form>
            <Field
              type="text"
              name="name"
              label="name"
              required
              component={TextField}
              fullWidth
              margin="dense"
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="discount">type</InputLabel>
              <Field
                name="type"
                label="type"
                component={Select}
                inputProps={{
                  id: "type"
                }}
              >
                {discountTypes.map(({ label, value }) => (
                  <MenuItem key={guid()} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            {values.type === "buy_pay" && (
              <Box>
                <Field
                  type="number"
                  name="buy"
                  label="buy"
                  required
                  component={TextField}
                  fullWidth
                  margin="dense"
                />
                <Field
                  type="number"
                  name="pay"
                  label="pay"
                  required
                  component={TextField}
                  fullWidth
                  margin="dense"
                />
              </Box>
            )}
            {values.type === "percent" && (
              <Field
                type="number"
                name="percent"
                label="percent"
                required
                component={TextField}
                fullWidth
                margin="dense"
              />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddDiscountForm;
