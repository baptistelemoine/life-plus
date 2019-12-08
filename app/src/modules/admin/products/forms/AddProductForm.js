import React from "react";
import { TextField, Select } from "formik-material-ui";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const AddProductForm = props => {
  const { bindSubmitForm, onSubmit, initialValues } = props;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        onSubmit(values);
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
              required
              component={TextField}
              fullWidth
              margin="dense"
            />
            <Field
              type="text"
              name="description"
              label="description"
              required
              component={TextField}
              fullWidth
              margin="dense"
            />
            <Field
              type="number"
              name="price"
              label="price"
              required
              component={TextField}
              fullWidth
              margin="dense"
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="discount">discount</InputLabel>
              <Field
                name="discount"
                label="discount"
                component={Select}
                inputProps={{
                  id: "discount"
                }}
              >
                <MenuItem value={10}>first discount</MenuItem>
                <MenuItem value={20}>second discount</MenuItem>
                <MenuItem value={30}>third discount</MenuItem>
              </Field>
            </FormControl>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProductForm;
