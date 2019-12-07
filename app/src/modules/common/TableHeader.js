import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const TableHeader = props => {
  const { title, text } = props;
  return (
    <Box mb={4}>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        {title}
      </Typography>
      <Typography color="textSecondary" paragraph>
        {text}
      </Typography>
    </Box>
  );
};

export default TableHeader;
