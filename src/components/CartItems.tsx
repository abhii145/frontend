import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  calculatePrice,
  decreaseQuantity,
  increaseQuantity,
  removeCartItem,
} from "../redux/reducer/cartSlice";
import toast from "react-hot-toast";

interface CartItemsProps {
  id: string;
  title: string;
  price: number;
  photo: string;
  quantity: number;
}

const CartItems = ({ id, title, price, photo, quantity }: CartItemsProps) => {
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
     dispatch(calculatePrice());
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
     dispatch(calculatePrice());
  };

  const handleRemoveCartItem = (id: string) => {
    toast.success("Item removed from cart");
    dispatch(removeCartItem(id));
  };

  return (
    <div className="flex items-center bg-white shadow-md p-4 rounded-lg transition transform hover:scale-105 hover:shadow-lg">
      <img
        src={photo}
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
        <p className="text-gray-600">₹{price}</p>
        <div className="flex items-center space-x-2 mt-2">
          <button
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handleIncreaseQuantity(id)}
          >
            <FaPlus />
          </button>
          <p>{quantity}</p>
          <button
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handleDecreaseQuantity(id)}
          >
            <FaMinus />
          </button>
        </div>
      </div>
      <button
        className="text-red-600 hover:text-red-800 ml-4"
        onClick={() => handleRemoveCartItem(id)}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItems;
