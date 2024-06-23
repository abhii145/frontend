import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";

const OfferPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const {
    data: categoriesResponse,
    isError,
    isLoading: loadingCategories,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });



 if (isError) return toast.error('failed to fetch categories');

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
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">None</option>
              <option value="asc">Price (Low to High)</option>
              <option value="dsc">Price (High to Low)</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="mt-4">
            <label className="block mb-2">Max Price: {maxPrice || ""}</label>
            <input
              type="range"
              min={100}
              max={100000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            {/* <div className="flex justify-between mt-2">
              <span>$100</span>
              <span>$100,000</span>
            </div> */}
          </div>

          {/* Category Dropdown */}
          <div className="mt-4">
            <label className="block mb-2">
              Category
            </label>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {!loadingCategories &&
                categoriesResponse?.categoriesProducts.map(
                  (category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  )
                )}
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
          {searchedData?.products.map((product) => (
            <Link to={`/product/${product?._id}`} key={product?.id}>
              <ProductCard product={product} title={""} price={0} stock={0} category={""} description={""} photo={""} _id={""} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
