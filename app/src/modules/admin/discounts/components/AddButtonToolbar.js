import React, { useState } from "react";
import ModalForm from "../../../common/ModalForm";
import AddDiscountForm from "../forms/AddDiscountForm";
import AddIcon from "@material-ui/icons/Add";
import useSWR, { trigger } from "swr";
import axios from "axios";
import { DISCOUNTS_API } from "../../../common/constants";

const AddButtonToolbar = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async ({ name, type, buy, pay, percent }) => {
    const discount = {
      name,
      type,
      [type]: type === "buy_pay" ? [buy, pay] : percent
    };
    setIsSubmitting(true);
    await axios.post(DISCOUNTS_API, discount);
    trigger(DISCOUNTS_API);
    setIsSubmitting(false);
  };

  return (
    <ModalForm
      title="Add discount"
      text="Please fill all required fields to create a new discount"
      open={false}
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
