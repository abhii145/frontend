import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { orderSchema } from "../../../types/Schema";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const orderItems = [
  {
    name: "Puma Shoes",
    photo: img,
    _id: "asdsaasdas",
    quantity: 4,
    price: 2000,
  },
];

type OrderFormValues = z.infer<typeof orderSchema>;

const TransactionManagement = () => {
  const defaultOrder = {
    name: "Abhishek Singh",
    address: "77 Black Street",
    city: "Neyword",
    state: "Nevada",
    country: "India",
    pinCode: 2434341,
    status: "Processing" as const,
    subtotal: 4000,
    discount: 1200,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 - 1200,
    orderItems,
    _id: "asdnasjdhbn",
  };

  const { handleSubmit, watch, setValue } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: defaultOrder,
  });

  const order = watch();

  const updateHandler = () => {
    const newStatus =
      order.status === "Processing"
        ? "Shipped"
        : order.status === "Shipped"
        ? "Delivered"
        : "Processing";
    setValue("status", newStatus);
  };

  const onSubmit = (data: OrderFormValues) => {
    console.log(data);
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Order Items</h2>
          {order.orderItems.map((item) => (
            <ProductCard
              key={item._id}
              name={item.name}
              photo={item.photo}
              _id={item._id}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
        </section>

        <article className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Info</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h5 className="text-lg font-medium text-gray-700">User Info</h5>
            <p className="text-gray-600">Name: {order.name}</p>
            <p className="text-gray-600">
              Address: {order.address}, {order.city}, {order.state},{" "}
              {order.country} {order.pinCode}
            </p>

            <h5 className="text-lg font-medium text-gray-700">Amount Info</h5>
            <p className="text-gray-600">Subtotal: ${order.subtotal}</p>
            <p className="text-gray-600">
              Shipping Charges: ${order.shippingCharges}
            </p>
            <p className="text-gray-600">Tax: ${order.tax}</p>
            <p className="text-gray-600">Discount: ${order.discount}</p>
            <p className="text-gray-600">Total: ${order.total}</p>

            <h5 className="text-lg font-medium text-gray-700">Status Info</h5>
            <p className="text-gray-600">
              Status:{" "}
              <span
                className={`font-semibold ${
                  order.status === "Delivered"
                    ? "text-purple-600"
                    : order.status === "Shipped"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {order.status}
              </span>
            </p>

            <button
              type="button"
              onClick={updateHandler}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Process Status
            </button>
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
        ${price} x {quantity} = ${price * quantity}
      </span>
    </div>
  </div>
);

export default TransactionManagement;
