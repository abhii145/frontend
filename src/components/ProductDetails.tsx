// Updated ProductDetails.tsx with stock limit check for Add to Cart button

import React from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { useSingleProductQuery } from "../redux/api/productAPI";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducer/cartSlice";
import toast from "react-hot-toast";
import { RootState } from "../redux/store";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const {cartItems} = useSelector((state:RootState) =>state.cartSlice);

  const handleAddToCart = (data) => {
    try {
      dispatch(
        addToCart({
          ...data,
          quantity: 1,
        })
      );
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  const { data, isLoading, isError } = useSingleProductQuery(id as string);

  const isAtStockLimit = (product) => {
    const itemInCart = cartItems.find((item) => item._id === product._id);
    return itemInCart && itemInCart.quantity >= product.stock;
  };

  if (!id) {
    return <div>No product ID provided</div>;
  }

  if (isLoading)
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  if (isError) return <div className="text-center">{isError}</div>;

  if (!data) return <div className="text-center">Product not found</div>;

  return (
    <div className="container mx-auto p-4 mt-20 ">
      {data && (
        <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
          <img
            src={data.product.photo}
            alt={data.product.title}
            className="w-full max-w-sm h-auto object-cover mb-4 lg:mb-0"
            loading="lazy"
          />
          <div className="max-w-lg w-full flex flex-col justify-between h-full">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-center lg:text-left">
                {data.product.title}
              </h1>
              <p className="text-gray-800 mb-4">{data.product.description}</p>
              <p className="text-gray-600 mb-4">
                Category: {data.product.category}
              </p>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-2xl font-semibold text-gray-900">
                ₹{data.product.price.toFixed(2)}
              </span>
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ${
                  isAtStockLimit(data.product)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
                onClick={() =>
                  !isAtStockLimit(data.product) && handleAddToCart(data.product)
                }
                disabled={isAtStockLimit(data.product)}
              >
                {!isAtStockLimit(data.product) ? 'Add To Cart' : 'out of stock'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
