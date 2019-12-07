import React, { Fragment } from "react";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import TableHeader from "../../common/TableHeader";
import ModalForm from "../../common/ModalForm";
import AddProductForm from "./forms/AddProductForm";

const columns = [
  "Name",
  "Description",
  "Price",
  "Discount",
  {
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

const data = [
  [
    "My first product",
    "This is a description for my first product",
    23.4,
    "Buy 3 pay 2"
  ],
  [
    "Super product with discount",
    "Another description for second first product",
    12.8,
    "10% discount"
  ]
];

const options = {
  selectableRows: "none",
  pagination: false,
  print: false,
  download: false,
  viewColumns: false,
  filter: false,
  customToolbar: () => {
    const handleSubmit = e => {
      console.info(e);
    };
    return (
      <ModalForm
        renderIcon={<AddIcon />}
        renderForm={bindSubmitForm => {
          return (
            <AddProductForm
              initialValues={{ email: "" }}
              bindSubmitForm={bindSubmitForm}
              onSubmit={handleSubmit}
            />
          );
        }}
      />
    );
  }
};

const Products = props => {
  return (
    <Fragment>
      <TableHeader
        title="Products"
        text="Add, edit, delete and add discounts for your products"
      />
      <MUIDataTable data={data} columns={columns} options={options} />
    </Fragment>
  );
};

export default Products;
