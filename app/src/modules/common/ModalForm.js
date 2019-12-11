import React, { Fragment, useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Box from "@material-ui/core/Box";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const ModalForm = props => {
  const {
    renderIcon,
    renderButton,
    open,
    renderForm,
    title,
    text,
    isSubmitting,
    onClose,
    error
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
    if (!isSubmitting && submitMyForm && !error) setIsOpen(false);
  }, [isSubmitting, submitMyForm, error]);

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
          {error && <Box mt={2}>{error}</Box>}
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
      <Box onClick={handleClick} display="inline">
        {renderIcon && (
          <IconButton color="primary" component="span">
            {renderIcon}
          </IconButton>
        )}
        {renderButton}
      </Box>
    </Fragment>
  );
};

export default ModalForm;
