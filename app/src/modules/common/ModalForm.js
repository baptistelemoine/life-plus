import React, { Fragment, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const ModalForm = props => {
  const { children, renderIcon, open, renderForm } = props;
  const [isOpen, setIsOpen] = useState(open || false);

  let submitMyForm = null;

  const bindSubmitForm = submitForm => {
    submitMyForm = submitForm;
  };
  const handleClick = e => {
    setIsOpen(true);
  };
  const handleClose = e => {
    setIsOpen(false);
  };
  const handleSubmit = e => {
    if (submitMyForm) {
      submitMyForm(e);
    }
  };

  return (
    <Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          {renderForm(bindSubmitForm)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton
        onClick={handleClick}
        color="primary"
        aria-label="upload picture"
        component="span"
      >
        {renderIcon}
      </IconButton>
    </Fragment>
  );
};

export default ModalForm;
