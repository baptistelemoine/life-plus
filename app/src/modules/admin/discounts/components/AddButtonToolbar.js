import React, { useState } from "react";
import ModalForm from "../../../common/ModalForm";
import AddDiscountForm from "../forms/AddDiscountForm";
import AddIcon from "@material-ui/icons/Add";
import useSWR, { trigger } from "swr";
import axios from "axios";
import { DISCOUNTS_API } from "../../../common/constants";
import { renderErrors } from "../../../../helpers/utils";

const AddButtonToolbar = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async ({ name, type, buy, pay, percent }) => {
    const discount = {
      name,
      type,
      [type]: type === "buy_pay" ? [buy, pay] : percent
    };
    setIsSubmitting(true);
    try {
      await axios.post(DISCOUNTS_API, discount);
      setError(null);
      trigger(DISCOUNTS_API);
    } catch (error) {
      setError(renderErrors(error.response.data));
    }
    setIsSubmitting(false);
  };

  const handleClose = () => setError(null);

  return (
    <ModalForm
      title="Add discount"
      text="Please fill all required fields to create a new discount"
      open={false}
      error={error}
      onClose={handleClose}
      isSubmitting={isSubmitting}
      renderIcon={<AddIcon />}
      renderForm={bindSubmitForm => {
        return (
          <AddDiscountForm
            initialValues={{
              name: "",
              type: "",
              buy_pay: "",
              buy: "",
              pay: "",
              percent: ""
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
