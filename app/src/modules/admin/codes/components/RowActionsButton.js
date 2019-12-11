import React, { useState, Fragment } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ModalForm from "../../../common/ModalForm";
import AddCodeForm from "../forms/AddCodeForm";
import axios from "axios";
import useSWR, { trigger } from "swr";
import { CODES_API } from "../../../common/constants";
import { renderErrors } from "../../../../helpers/utils";

const RowActionsButton = props => {
  const { id } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const { data: codes } = useSWR(CODES_API);

  const initialValues = codes.find(({ _id }) => _id === id);

  const handleSubmit = async ({ name, code, type, value }) => {
    setIsSubmitting(true);
    try {
      await axios.put(`${CODES_API}/${id}`, { name, code, type, value });
      trigger(CODES_API);
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

  const handleDelete = async () => {
    await axios.delete(`${CODES_API}/${id}`);
    trigger(CODES_API);
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
        title="Update discount code"
        open={isModalOpened}
        onClose={handleClose}
        error={error}
        text="Please fill all required fields to update discount code"
        isSubmitting={isSubmitting}
        renderForm={bindSubmitForm => {
          return (
            <AddCodeForm
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
