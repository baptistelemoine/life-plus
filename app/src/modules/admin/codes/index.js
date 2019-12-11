import React from "react";
import MUIDataTable from "mui-datatables";
import TableHeader from "../../common/TableHeader";
import useSWR from "swr";
import AddButtonToolbar from "./components/AddButtonToolbar";
import RowActionsButton from "./components/RowActionsButton";
import { CODES_API } from "../../common/constants";
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
    label: "Code",
    name: "code"
  },
  {
    name: "type",
    options: {
      display: false
    }
  },
  {
    label: "Value",
    name: "value",
    options: {
      customBodyRender: (value, tableMeta) => {
        const [, , , type] = tableMeta.rowData;
        if (type === "percent") {
          return `${value}%`;
        }
        return value;
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

const Codes = props => {
  const { data } = useSWR(CODES_API);
  return (
    <Box mt={6}>
      <TableHeader title="Codes" text="Add, edit, delete codes for your shop" />
      {data && <MUIDataTable data={data} columns={columns} options={options} />}
    </Box>
  );
};

export default Codes;
