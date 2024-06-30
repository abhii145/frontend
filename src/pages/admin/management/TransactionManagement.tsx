/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { TbStatusChange } from "react-icons/tb";
import toast from "react-hot-toast";

const TransactionManagement = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const { id } = useParams<{ id: string }>();

  const updateOrders = async (orderId: string, userId: string) => {
    try {
      await axios.put(
        `http://localhost:5005/api/v1/order/${orderId}?id=${userId}`
      );
      toast.success("Order updated successfully");
    } catch (error) {
      toast.error("Error updating order");
    }
  };

  const deleteOrders = async (orderId: string, userId: string) => {
    try {
      await axios.delete(
        `http://localhost:5005/api/v1/order/${orderId}?id=${userId}`
      );
      toast.success("Order deleted successfully");
    } catch (error) {
      toast.error("Error deleting order");
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5005/api/v1/order/${id}`);
        const data = await res.data.order;
        console.log("Fetched data:", data);
        setOrderDetails(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const updateHandler = async () => {
    try {
      const newStatus =
        orderDetails.status === "Processing"
          ? "Shipped"
          : orderDetails.status === "Shipped"
          ? "Delivered"
          : "Processing";
      setOrderDetails({ ...orderDetails, status: newStatus });
      await updateOrders(orderDetails._id, orderDetails.user._id);
      navigate("/admin/transactions");
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const deleteHandler = async () => {
    try {
      await deleteOrders(orderDetails._id, orderDetails.user._id);
      navigate("/admin/transactions");
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  const {
    handleSubmit,
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Order Items</h2>
          {orderDetails.orderItems?.map((item: any) => (
            <ProductCard
              key={item?._id}
              name={item?.title}
              photo={item?.photo}
              _id={item?.productId}
              quantity={item?.quantity}
              price={item?.price}
            />
          ))}
        </section>

        <article className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Info</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h5 className="text-lg font-medium text-gray-700">User Info</h5>
            <p className="text-gray-600">Name: {orderDetails.user?.name}</p>
            <p className="text-gray-600">
              Address: {orderDetails.shippingInfo?.address},{" "}
              {orderDetails.shippingInfo?.city},{" "}
              {orderDetails.shippingInfo?.state},{" "}
              {orderDetails.shippingInfo?.country}{" "}
              {orderDetails.shippingInfo?.pinCode}
            </p>

            <h5 className="text-lg font-medium text-gray-700">Amount Info</h5>
            <p className="text-gray-600">Subtotal: ${orderDetails.subtotal}</p>
            <p className="text-gray-600">
              Shipping Charges: ${orderDetails.shippingCharges}
            </p>
            <p className="text-gray-600">Tax: ${orderDetails.tax}</p>
            <p className="text-gray-600">Discount: ${orderDetails.discount}</p>
            <p className="text-gray-600">Total: ${orderDetails.total}</p>

            <h5 className="text-lg font-medium text-gray-700">Status Info</h5>
            <p className="text-gray-600">
              Status:
              <span
                className={`font-semibold ${
                  orderDetails.status === "Delivered"
                    ? "text-purple-600"
                    : orderDetails.status === "Shipped"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {orderDetails.status}
              </span>
            </p>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={updateHandler}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <TbStatusChange />{" "}
              </button>
              <button
                type="button"
                onClick={deleteHandler}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <FaTrash />
              </button>
            </div>
          </form>
        </article>
      </div>
    </main>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  _id,
}: {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  _id: string;
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
    <img
      src={photo}
      alt={name}
      className="w-16 h-16 object-cover rounded-md"
      loading="lazy"
    />
    <div>
      <Link
        to={`/product/${_id}`}
        className="text-lg font-semibold text-blue-600 hover:underline"
      >
        {name}
      </Link>
      <span className="block text-gray-500">
        ₹{price} x {quantity} = ₹{price * quantity}
      </span>
    </div>
  </div>
);

export default TransactionManagement;
