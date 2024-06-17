import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Loader } from "../components";

const OfferPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
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

  if (loading) return (
    <div>
      <Loader />
    </div>
  );
  if (error) return <div>{error}</div>;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Sidebar for filters */}
      <div
        className={`bg-white shadow-md w-full lg:w-64 transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden lg:block"
        } fixed inset-0 lg:static z-50 lg:z-auto`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={toggleSidebar} className="lg:hidden">
              <span className="material-icons">
                {isSidebarOpen ? "close" : "menu"}
              </span>
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="mt-4">
            <label htmlFor="sort" className="block mb-2">
              Sort By
            </label>
            <select id="sort" className="w-full p-2 border rounded">
              <option value="none">None</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="mt-4">
            <label className="block mb-2">Price Range</label>
            <input type="range" min="100" max="100000" className="w-full" />
            <div className="flex justify-between mt-2">
              <span>$100</span>
              <span>$100,000</span>
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="mt-4">
            <label htmlFor="category" className="block mb-2">
              Category
            </label>
            <select id="category" className="w-full p-2 border rounded">
              <option value="all">All</option>
              <option value="camera">Camera</option>
              <option value="watch">Watch</option>
              <option value="clothes">Clothes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overlay for sidebar on smaller screens */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}

      {/* Main content area */}
      <div
        className={`flex-1 p-4 bg-gray-100 transition-all duration-300 ${
          isSidebarOpen ? "blur-md" : ""
        } lg:blur-none overflow-auto`}
        style={{ maxHeight: "calc(100vh - 64px)" }} // Adjust the maxHeight based on your header height
      >
        <div className="flex justify-end mb-4 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-gray-200 rounded-full"
          >
            <span className="material-icons">
              {isSidebarOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link to={`/product/${product?.id}`} key={product?.id}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
