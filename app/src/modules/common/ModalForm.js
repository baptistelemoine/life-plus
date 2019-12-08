import React, { Fragment, useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const ModalForm = props => {
  const {
    renderIcon,
    open,
    renderForm,
    title,
    text,
    isSubmitting,
    onClose
  } = props;
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
    if (onClose) onClose();
  };
  const handleSubmit = e => {
    if (submitMyForm) {
      submitMyForm(e);
    }
  };

  useEffect(() => {
    if (!isSubmitting && submitMyForm) setIsOpen(false);
  }, [isSubmitting, submitMyForm]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          {renderForm(bindSubmitForm)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {renderIcon && (
        <IconButton
          onClick={handleClick}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          {renderIcon}
        </IconButton>
      )}
    </Fragment>
  );
};

export default ModalForm;
