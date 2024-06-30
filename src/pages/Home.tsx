import React from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { Product } from "../types";
import OfferCarousel from "../components/OfferCarousel";
import { FaArrowRight } from "react-icons/fa6";

const Home: React.FC = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (isError) return <div>Failed to fetch products</div>;

  return (
    <div className="p-4">
      <OfferCarousel />
      <div className="flex justify-between items-center mb-4 mt-5">
        <h1 className="text-xl font-semibold">Latest Products</h1>
        <Link
          to="/search"
          className="text-blue-500 hover:underline flex items-center"
        >
          View all <FaArrowRight className="ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.products.map((product: Product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <ProductCard
              title={""}
              price={0}
              stock={0}
              category={""}
              description={""}
              photo={""}
              _id={""}
              {...{ product }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
