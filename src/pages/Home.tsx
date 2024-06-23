import React from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { Product } from "../types";
import OfferCarousel from "../components/OfferCarousel";



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
      <h1 className="text-xl font-semibold mb-4 mt-5 ">Latest Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.products.map((product: Product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
