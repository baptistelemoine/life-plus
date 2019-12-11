import React, { useState, Fragment } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ModalForm from "../../../common/ModalForm";
import AddProductForm from "../forms/AddProductForm";
import axios from "axios";
import useSWR, { trigger } from "swr";
import { PRODUCTS_API, DISCOUNTS_API } from "../../../common/constants";
import { renderErrors } from "../../../../helpers/utils";

const RowActionsButton = props => {
  const { id } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const { data: discounts } = useSWR(DISCOUNTS_API);
  const { data: products } = useSWR(PRODUCTS_API);

  const productRef = products.find(({ _id }) => _id === id);
  let initialValues;
  if (productRef.discount) {
    initialValues = { ...productRef, discount: productRef.discount._id };
  } else initialValues = productRef;

  const handleSubmit = async product => {
    setIsSubmitting(true);
    try {
      await axios.put(`${PRODUCTS_API}/${id}`, product);
      trigger(PRODUCTS_API);
      setIsModalOpened(false);
      setError(null);
    } catch (error) {
      setError(renderErrors(error.response.data));
    }
    setIsSubmitting(false);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = e => {
    setAnchorEl(null);
    setIsModalOpened(false);
    setError(null);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setIsModalOpened(true);
  };

  return (
    <Fragment>
      <IconButton aria-label="more" component="span" onClick={handleClick}>
        <MoreVertIcon aria-controls="simple-menu" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>
      <ModalForm
        title="Update product"
        open={isModalOpened}
        error={error}
        onClose={handleClose}
        text="Please fill all required fields to update product"
        isSubmitting={isSubmitting}
        renderForm={bindSubmitForm => {
          return (
            <AddProductForm
              initialValues={initialValues}
              discounts={discounts}
              bindSubmitForm={bindSubmitForm}
              onSubmit={handleSubmit}
            />
          );
        }}
      />
    </Fragment>
  );
};

export default RowActionsButton;
