import React, { Fragment } from "react";
import { TextField, Select } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { guid } from "../../../../helpers/utils";

const codeTypes = ["percent", "fixed"];

const AddCodeForm = props => {
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
              disabled={false}
              component={TextField}
              fullWidth
              margin="dense"
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="discount">type</InputLabel>
              <Field
                name="type"
                label="type"
                disabled={false}
                component={Select}
                inputProps={{
                  id: "type"
                }}
              >
                {codeTypes.map(type => (
                  <MenuItem key={guid()} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <Field
              type="text"
              name="code"
              label="code"
              required
              disabled={false}
              component={TextField}
              fullWidth
              margin="dense"
            />
            <Field
              type="text"
              name="value"
              label="value"
              required
              disabled={false}
              component={TextField}
              fullWidth
              margin="dense"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddCodeForm;
