import React, { useState } from "react";
import ModalForm from "../../../common/ModalForm";
import AddProductForm from "../forms/AddProductForm";
import AddIcon from "@material-ui/icons/Add";
import useSWR, { trigger } from "swr";
import axios from "axios";
import { PRODUCTS_API, DISCOUNTS_API } from "../../../common/constants";
import { renderErrors } from "../../../../helpers/utils";

const AddButtonToolbar = props => {
  const { data: discounts } = useSWR(DISCOUNTS_API);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async product => {
    setIsSubmitting(true);
    try {
      await axios.post(PRODUCTS_API, product);
      setError(null);
      trigger(PRODUCTS_API);
    } catch (error) {
      setError(renderErrors(error.response.data));
    }
    setIsSubmitting(false);
  };

  const handleClose = () => setError(null);

  return (
    <ModalForm
      title="Add product"
      text="Please fill all required fields to create a new product"
      open={false}
      error={error}
      onClose={handleClose}
      isSubmitting={isSubmitting}
      renderIcon={<AddIcon data-test="admin-products-add-btn" />}
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
