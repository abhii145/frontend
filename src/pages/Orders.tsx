import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Order {
  _id: string;
  orderItems: {
    photo: string;
    quantity: number;
  }[];
  discount: number;
  total: number;
  status: string;
}

const OrderPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5005/api/v1/order/myorders?id=${user?._id}`
        );
        const orderData = res.data;
        console.log(orderData);
        setOrders(orderData.orders);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user?._id]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 mt-5">Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Photo</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Discount</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={order.orderItems[0].photo}
                    alt="Product"
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.orderItems[0].quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.discount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.total}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
