import React, { Fragment } from "react";
import MUIDataTable from "mui-datatables";
import TableHeader from "../../common/TableHeader";
import useSWR from "swr";
import AddButtonToolbar from "./components/AddButtonToolbar";
import RowActionsButton from "./components/RowActionsButton";
import { PRODUCTS_API } from "../../common/constants";

const columns = [
  {
    name: "_id",
    options: {
      display: false
    }
  },
  { label: "Name", name: "name" },
  { label: "Description", name: "description" },
  { label: "Price", name: "price" },
  { label: "Discount", name: "discount.name" },
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

const Products = props => {
  const { data } = useSWR(PRODUCTS_API);
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
