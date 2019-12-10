import React, { useState, Fragment } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ModalForm from "../../../common/ModalForm";
import AddDiscountForm from "../forms/AddDiscountForm";
import axios from "axios";
import useSWR, { trigger } from "swr";
import { DISCOUNTS_API } from "../../../common/constants";

const RowActionsButton = props => {
  const { id } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: discounts } = useSWR(DISCOUNTS_API);

  const discountRef = discounts.find(({ _id }) => _id === id);
  const initialValues = {
    name: discountRef.name,
    type: discountRef.type,
    buy: discountRef.buy_pay ? discountRef.buy_pay[0] || "" : "",
    pay: discountRef.buy_pay ? discountRef.buy_pay[1] || "" : "",
    percent: discountRef.percent || ""
  };

  const handleSubmit = async ({ name, type, buy, pay, percent }) => {
    const discount = {
      name,
      type,
      [type]: type === "buy_pay" ? [buy, pay] : percent
    };
    setIsSubmitting(true);
    await axios.put(`${DISCOUNTS_API}/${id}`, discount);
    trigger(DISCOUNTS_API);
    setIsSubmitting(false);
    setIsModalOpened(false);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = e => {
    setAnchorEl(null);
    setIsModalOpened(false);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setIsModalOpened(true);
  };

  const handleDelete = async () => {
    await axios.delete(`${DISCOUNTS_API}/${id}`);
    trigger(DISCOUNTS_API);
    setAnchorEl(null);
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
        <MenuItem onClick={handleDelete}>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>
      <ModalForm
        title="Update discount"
        open={isModalOpened}
        onClose={handleClose}
        text="Please fill all required fields to update discount"
        isSubmitting={isSubmitting}
        renderForm={bindSubmitForm => {
          return (
            <AddDiscountForm
              initialValues={initialValues}
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
