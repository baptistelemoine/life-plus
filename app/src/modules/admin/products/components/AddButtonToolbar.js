import React, { useState } from "react";
import ModalForm from "../../../common/ModalForm";
import AddProductForm from "../forms/AddProductForm";
import AddIcon from "@material-ui/icons/Add";
import useSWR, { trigger, mutate } from "swr";
import _omit from "lodash/omit";
import axios from "axios";
import { PRODUCTS_API } from "../../../common/constants";

const AddButtonToolbar = props => {
  const { data: staledData } = useSWR(PRODUCTS_API);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async product => {
    setIsSubmitting(true);
    const newProduct = await axios.post(
      PRODUCTS_API,
      _omit(product, "discount")
    );
    mutate(PRODUCTS_API, [...staledData, newProduct.data]);
    setIsSubmitting(false);
  };
  return (
    <ModalForm
      title="Add product"
      text="Please fill all required fields to create a new product"
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
            bindSubmitForm={bindSubmitForm}
            onSubmit={handleSubmit}
          />
        );
      }}
    />
  );
};

export default AddButtonToolbar;
