import React, { ReactElement, useState } from "react";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import TableHOC from "./admin/TableHOC";

type DataType = {
  _id: string;
  price: number;
  quantity: number;
  amount: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
  const [rows] = useState<DataType[]>([
    {
      _id: "abhii",
      price: 1000,
      quantity: 10,
      amount: 1008,
      discount: 20,

      status: <span className="red">processing</span>,
      action: <Link to={"/order/abhii"}>view</Link>,
    },
  ]);
  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    true
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {Table}
    </div>
  );
};

export default Orders;
