import React, { Fragment } from "react";
import CartItem from "./components/CartItem";
import useSWR from "swr";
import { CARTS_API } from "../../common/constants";
import TableHeader from "../../common/TableHeader";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const Carts = props => {
  const { data } = useSWR(CARTS_API);
  return (
    <Fragment>
      <TableHeader
        title="Carts"
        text="Display all carts using date range below"
      />
      <Box mb={5}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            label="Start date"
            // value={selectedDate}
            // onChange={handleDateChange}
          />
          <Box ml={5} display="inline">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              label="End date"
              format="MM/dd/yyyy"
              // value={selectedDate}
              // onChange={handleDateChange}
            />
          </Box>
        </MuiPickersUtilsProvider>
      </Box>
      {data &&
        data.map((cart, index) => (
          <Box mb={6}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {`Cart #${index + 1}`}
            </Typography>
            <CartItem cart={cart} />
          </Box>
        ))}
    </Fragment>
  );
};

export default Carts;
