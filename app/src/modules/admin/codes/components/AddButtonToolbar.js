import React, { useState } from "react";
import ModalForm from "../../../common/ModalForm";
import AddCodeForm from "../forms/AddCodeForm";
import AddIcon from "@material-ui/icons/Add";
import { trigger } from "swr";
import axios from "axios";
import { CODES_API } from "../../../common/constants";
import { renderErrors } from "../../../../helpers/utils";

const AddButtonToolbar = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async ({ name, code, type, value }) => {
    setIsSubmitting(true);
    try {
      await axios.post(CODES_API, { name, code, type, value });
      setError(null);
      trigger(CODES_API);
    } catch (error) {
      setError(renderErrors(error.response.data));
    }
    setIsSubmitting(false);
  };

  const handleClose = () => setError(null);

  return (
    <ModalForm
      title="Add discount code"
      text="Please fill all required fields to create a new discount code"
      open={false}
      isSubmitting={isSubmitting}
      error={error}
      onClose={handleClose}
      renderIcon={<AddIcon />}
      renderForm={bindSubmitForm => {
        return (
          <AddCodeForm
            initialValues={{
              name: "",
              code: "",
              type: "",
              value: ""
            }}
            bindSubmitForm={bindSubmitForm}
            onSubmit={handleSubmit}
          />
        );
      }}
    />
  );
};

export default AddButtonToolbar;
