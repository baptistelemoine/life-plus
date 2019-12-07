import React, { Fragment } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const AdminPage = props => {
  const { children } = props;
  return (
    <Fragment>
      <Container>
        <Box p={5}>{children}</Box>
      </Container>
    </Fragment>
  );
};

export default AdminPage;
