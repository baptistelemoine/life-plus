import React, { useState, useContext } from "react";
import ModalForm from "../../common/ModalForm";
import UpdateCodeForm from "../forms/UpdateCodeForm";
import Button from "@material-ui/core/Button";
import { trigger } from "swr";
import axios from "axios";
import { CARTS_API } from "../../common/constants";
import CartContext from "../../shop/context";

const UpdateCodeButton = props => {
  const { cart } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async value => {
    setIsSubmitting(true);
    try {
      await axios.put(`${CARTS_API}/${cart._id}`, value);
      setError(null);
      trigger(`${CARTS_API}/${cart._id}`);
      setIsSubmitting(false);
    } catch (error) {
      setError(
        `<Typography color="error" variant="caption">${value.discount_code} is not a valid code</Typography>`
      );
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError(null);
  };

  return (
    <ModalForm
      title="Update code"
      text="Please provide a valid discount code"
      open={false}
      error={error}
      onClose={handleClose}
      isSubmitting={isSubmitting}
      renderButton={
        <Button color="primary">
          {cart.discount_code ? "update code" : "add code"}
        </Button>
      }
      renderForm={bindSubmitForm => {
        return (
          <UpdateCodeForm
            initialValues={{
              discount_code: cart.discount_code ? cart.discount_code.code : ""
            }}
            bindSubmitForm={bindSubmitForm}
            onSubmit={handleSubmit}
          />
        );
      }}
    />
  );
};

export default UpdateCodeButton;
