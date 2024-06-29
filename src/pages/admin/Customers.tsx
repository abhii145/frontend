import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const Customers = () => {
  const [rows, setRows] = useState<User[]>([]);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<{ data: User[] }>(
          "http://localhost:5005/api/v1/user/all?id=666df7f2f299c6e181010798"
        );
        const data = response.data.data;
        console.log(data);
        setRows(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [user?._id]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:5005/api/v1/user/${id}/?id=666df7f2f299c6e181010798`
      );
      const filteredRows = rows.filter((user) => user._id !== id);
      setRows(filteredRows);
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Role</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-100">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
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
