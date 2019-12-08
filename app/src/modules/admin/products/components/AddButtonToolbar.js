import React, { useState } from "react";
import ModalForm from "../../../common/ModalForm";
import AddProductForm from "../forms/AddProductForm";
import AddIcon from "@material-ui/icons/Add";
import useSWR, { trigger } from "swr";
import axios from "axios";
import { PRODUCTS_API, DISCOUNTS_API } from "../../../common/constants";

const AddButtonToolbar = props => {
  const { data: discounts } = useSWR(DISCOUNTS_API);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async product => {
    setIsSubmitting(true);
    await axios.post(PRODUCTS_API, product);
    trigger(PRODUCTS_API);
    setIsSubmitting(false);
  };

  return (
    <ModalForm
      title="Add product"
      text="Please fill all required fields to create a new product"
      open={false}
      isSubmitting={isSubmitting}
      renderIcon={<AddIcon />}
      renderForm={bindSubmitForm => {
        return (
          <AddProductForm
            initialValues={{
              name: "",
              description: "",
              price: "",
              discount: ""
            }}
            discounts={discounts}
            bindSubmitForm={bindSubmitForm}
            onSubmit={handleSubmit}
          />
        );
      }}
    />
  );
};

export default AddButtonToolbar;
