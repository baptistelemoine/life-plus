import React from "react";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, ErrorMessage } from "formik";

const AddProductForm = props => {
  const { bindSubmitForm, onSubmit, initialValues } = props;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, submitForm }) => {
        bindSubmitForm(submitForm);
        return (
          <Form>
            <Field
              type="email"
              name="email"
              label="email"
              component={TextField}
              fullWidth
              margin="dense"
            />
            <ErrorMessage name="email" component="div" />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProductForm;
