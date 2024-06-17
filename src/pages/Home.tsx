import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => {
      return (
        <Link to={`/product/${product.id}`} key={product.id}>
          <ProductCard product={product} />
        </Link>
      );
      })}
    </div>
  );
};

export default Home;
