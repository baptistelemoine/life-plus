import React, { Fragment } from "react";
import MUIDataTable from "mui-datatables";
import TableHeader from "../../common/TableHeader";
import useSWR from "swr";
import AddButtonToolbar from "./components/AddButtonToolbar";
import RowActionsButton from "./components/RowActionsButton";
import { DISCOUNTS_API } from "../../common/constants";
import Box from "@material-ui/core/Box";

const columns = [
  {
    name: "_id",
    options: {
      display: false
    }
  },
  { label: "Name", name: "name" },
  {
    label: "Buy pay",
    name: "buy_pay",
    options: {
      display: false
    }
  },
  {
    label: "Percent",
    name: "percent",
    options: {
      display: false
    }
  },
  {
    label: "Discount",
    name: "type",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const [, , buy_pay, percent] = tableMeta.rowData;
        if (value === "buy_pay") {
          return `Buy ${buy_pay[0]} and pay ${buy_pay[1]}`;
        }
        return `${percent}%`;
      }
    }
  },

  {
    name: "",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const [id] = tableMeta.rowData;
        return <RowActionsButton id={id} />;
      }
    }
  }
];

const options = {
  selectableRows: "none",
  pagination: false,
  print: false,
  download: false,
  viewColumns: false,
  filter: false,
  customToolbar: () => <AddButtonToolbar />
};

const Discounts = props => {
  const { data } = useSWR(DISCOUNTS_API);
  return (
    <Box mt={6}>
      <TableHeader
        title="Discounts"
        text="Add, edit, delete discounts for your shop"
      />
      {data && <MUIDataTable data={data} columns={columns} options={options} />}
    </Box>
  );
};

export default Discounts;
