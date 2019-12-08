import React, { Fragment } from "react";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TableHeader from "../../common/TableHeader";
import useSWR from "swr";
import AddButtonToolbar from "./components/AddButtonToolbar";
import { PRODUCTS_API } from "../../common/constants";

const columns = [
  { label: "Name", name: "name" },
  { label: "Description", name: "description" },
  { label: "Price", name: "price" },
  { label: "Discount", name: "discount.name" },
  {
    name: "",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <IconButton aria-label="more" component="span">
            <MoreVertIcon />
          </IconButton>
        );
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

const Products = props => {
  const { data, error } = useSWR(PRODUCTS_API);
  return (
    <Fragment>
      <TableHeader
        title="Products"
        text="Add, edit, delete and add discounts for your products"
      />
      {data && <MUIDataTable data={data} columns={columns} options={options} />}
    </Fragment>
  );
};

export default Products;
