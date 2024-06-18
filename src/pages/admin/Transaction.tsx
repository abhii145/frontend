import { Link } from "react-router-dom";

const transactionsData = [
  {
    user: "Charas",
    amount: 4500,
    discount: 400,
    quantity: 3,
    status: "Processing",
    action: "/admin/transaction/sajknaskd",
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    quantity: 6,
    status: "Shipped",
    action: "/admin/transaction/sajknaskd",
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    quantity: 6,
    status: "Delivered",
    action: "/admin/transaction/sajknaskd",
  },
];

const Transactions = () => {
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
                <th className="text-left p-3">Avatar</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Discount</th>
                <th className="text-left p-3">Quantity</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.map((transaction, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    <img
                      src={`https://randomuser.me/api/portraits/men/${
                        index + 1
                      }.jpg`}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-3">${transaction.amount}</td>
                  <td className="p-3">${transaction.discount}</td>
                  <td className="p-3">{transaction.quantity}</td>
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
                      to={transaction.action}
                      className="text-blue-500 hover:underline"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Transactions;
