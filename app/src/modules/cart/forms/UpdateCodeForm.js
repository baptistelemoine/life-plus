import React from "react";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";

const UpdateCodeForm = props => {
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
              name="discount_code"
              label="Discount code"
              disabled={false}
              required
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

export default UpdateCodeForm;
