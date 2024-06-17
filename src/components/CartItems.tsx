import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

interface CartItemsProps {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItems = ({ id, title, price, image, quantity }: CartItemsProps) => {
  return (
    <div className="flex items-center bg-white shadow-md p-4 rounded-lg transition transform hover:scale-105 hover:shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-24 h-24 object-contain rounded-lg"
        loading="lazy"
      />
      <div className="ml-4 flex-1">
        <Link
          to={`/product/${id}`}
          className="text-lg font-semibold hover:underline"
        >
          {title}
        </Link>
        <p className="text-gray-600">${price}</p>
        <div className="flex items-center space-x-2 mt-2">
          <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
            <FaPlus />
          </button>
          <p>{quantity}</p>
          <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
            <FaMinus />
          </button>
        </div>
      </div>
      <button className="text-red-600 hover:text-red-800 ml-4">
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItems;
