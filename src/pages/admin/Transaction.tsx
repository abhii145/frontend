/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const Transactions = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [transactionsData, setTransactionsData] = useState<any>({ orders: [] });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5005/api/v1/order/all?id=${user?._id}`
        );

        const data = await res.data;

        setTransactionsData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user?._id) {
      fetch();
    }
  }, [user?._id]);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Transactions
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-3">User</th>
                <th className="text-left p-3">Product</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Discount</th>
                <th className="text-left p-3">Quantity</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.orders.map(
                (transaction: any) => (
                  <tr key={transaction._id} className="border-t">
                    <td className="p-3">{transaction?.user?.name}</td>
                    <td className="p-3 flex flex-wrap">
                      {transaction.orderItems.map((item: any) => (
                        <img
                          key={item._id}
                          src={item.photo || "default-avatar.png"}
                          alt={item.title}
                          className="w-10 h-10 object-cover mr-2 mb-2 rounded-lg"
                        />
                      ))}
                    </td>

                    <td className="p-3">${transaction.total}</td>
                    <td className="p-3">${transaction.discount}</td>
                    <td className="p-3">
                      {transaction.orderItems.reduce(
                        (acc: number, item: any) => acc + item.quantity,
                        0
                      )}
                    </td>
                    <td
                      className={`p-3 ${
                        transaction.status === "Processing"
                          ? "text-red-500"
                          : transaction.status === "Shipped"
                          ? "text-green-500"
                          : "text-purple-500"
                      }`}
                    >
                      {transaction.status}
                    </td>
                    <td className="p-3">
                      <Link
                        to={`/admin/transaction/${transaction._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Transactions;
