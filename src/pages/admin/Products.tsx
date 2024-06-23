import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Loader } from "../../components";

interface DataType {
  photo: ReactElement;
  title: string;
  description: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const Products = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const { data, isLoading, isError } = useAllProductsQuery(user?._id as string);
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.products.map((product) => ({
          photo: (
            <img
              src={product.photo}
              alt={product.title}
              className="w-full h-48 object-contain rounded-t-lg"
              loading="lazy"
            />
          ),
          title: product.title,
          description: product.description,
          price: product.price,
          stock: product.stock,
          action: (
            <Link
              to={`/admin/product/${product._id}`}
              className="text-blue-500 hover:underline"
            >
              Manage
            </Link>
          ),
        }))
      );
    }
  }, [data]);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (isError) return <div>Error</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Manage Products</h1>
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {rows.map((row, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
          >
            {row.photo}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {row.title}
              </h3>
              <p className="text-gray-600 mb-1">Price: ${row.price}</p>
              <p className="text-gray-600 mb-1">Stock: {row.stock}</p>
              <p className="text-gray-500 mb-3">
                {row.description.slice(0, 80)}...
              </p>
              <div className="text-right">{row.action}</div>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/admin/product/new"
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
