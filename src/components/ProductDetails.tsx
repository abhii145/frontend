/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch product details");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  if (error) return <div className="text-center">{error}</div>;

  if (!product) return <div className="text-center">Product not found</div>;

  return (
    <div className="container mx-auto p-4 mt-20 ">
      <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-sm h-auto object-cover mb-4 lg:mb-0"
        />
        <div className="max-w-lg w-full flex flex-col justify-between h-full">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-center lg:text-left">
              {product.title}
            </h1>
            <p className="text-gray-800 mb-4">{product.description}</p>
            <p className="text-gray-600 mb-4">Category: {product.category}</p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
