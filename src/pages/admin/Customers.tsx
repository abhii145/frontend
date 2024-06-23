import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

const users = [
  {
    avatar: img,
    name: "Emily Palmer",
    email: "emily.palmer@example.com",
    gender: "female",
    role: "user",
  },
  {
    avatar: img2,
    name: "May Scoot",
    email: "aunt.may@example.com",
    gender: "female",
    role: "user",
  },
];

const Customers = () => {
  const [rows, setRows] = useState(users);

  const handleDelete = ({email}:{email:string}) => {
    const filteredRows = rows.filter((user) => user.email !== email);
    setRows(filteredRows);
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          User Management
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-3">Avatar</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Gender</th>
                <th className="text-left p-3">Role</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((user, index) => (
                <tr key={index} className="border-t hover:bg-gray-100">
                  <td className="p-3">
                    <img
                      className="w-12 h-12 rounded-full mx-auto"
                      src={user.avatar}
                      alt={user.name}
                      loading="lazy"
                    />
                  </td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.gender}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(user.email)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      aria-label="Delete user"
                    >
                      <FaTrash />
                    </button>
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

export default Customers;
