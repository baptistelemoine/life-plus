import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export const guid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export const renderErrors = ({ validation }) => {
  return validation.map(({ message }) => (
    <Box>
      <Typography key={guid()} color="error" variant="caption">
        {message}
      </Typography>
    </Box>
  ));
};
