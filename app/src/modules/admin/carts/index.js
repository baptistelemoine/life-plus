import React, { Fragment, useState } from "react";
import CartItem from "./components/CartItem";
import useSWR from "swr";
import { CARTS_API } from "../../common/constants";
import TableHeader from "../../common/TableHeader";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";
import { guid } from "../../../helpers/utils";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const Carts = props => {
  const [selectedFromDate, setSelectedFromDate] = useState(
    startOfDay(new Date())
  );
  const [selectedToDate, setSelectedToDate] = useState(endOfDay(new Date()));
  const { data } = useSWR(
    `${CARTS_API}?from=${selectedFromDate.getTime()}&to=${selectedToDate.getTime()}`
  );

  const handleFromDateChange = date => {
    setSelectedFromDate(startOfDay(date));
  };

  const handleToDateChange = date => {
    setSelectedToDate(endOfDay(date));
  };

  return (
    <Fragment>
      <TableHeader
        title="Carts"
        text="Display all carts using date range below"
      />
      <Box mb={5} display="flex" alignItems="flex-end">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            disableToolbar
            variant="inline"
            format="yyyy/MM/dd"
            value={selectedFromDate}
            autoOk
            label="Start date"
            onChange={handleFromDateChange}
          />
          <Box ml={5} display="inline">
            <DatePicker
              disableToolbar
              variant="inline"
              value={selectedToDate}
              minDate={selectedFromDate}
              label="End date"
              autoOk
              format="yyyy/MM/dd"
              onChange={handleToDateChange}
            />
          </Box>
        </MuiPickersUtilsProvider>
      </Box>
      {data &&
        data.map((cart, index) => (
          <Box mb={6} key={guid()}>
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
