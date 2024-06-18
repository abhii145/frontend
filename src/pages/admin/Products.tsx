import { ReactElement, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";
const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const arr: Array<DataType> = [
  {
    photo: (
      <img
        src={img}
        alt="Shoes"
        className="w-full h-48 object-cover rounded-t-lg"
      />
    ),
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: (
      <Link
        to="/admin/product/sajknaskd"
        className="text-blue-500 hover:underline"
      >
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img
        src={img2}
        alt="Shoes"
        className="w-full h-48 object-cover rounded-t-lg"
      />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        to="/admin/product/sdaskdnkasjdn"
        className="text-blue-500 hover:underline"
      >
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img
        src={img2}
        alt="Shoes"
        className="w-full h-48 object-cover rounded-t-lg"
      />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        to="/admin/product/sdaskdnkasjdn"
        className="text-blue-500 hover:underline"
      >
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img
        src={img2}
        alt="Shoes"
        className="w-full h-48 object-cover rounded-t-lg"
      />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        to="/admin/product/sdaskdnkasjdn"
        className="text-blue-500 hover:underline"
      >
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img
        src={img2}
        alt="Shoes"
        className="w-full h-48 object-cover rounded-t-lg"
      />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        to="/admin/product/sdaskdnkasjdn"
        className="text-blue-500 hover:underline"
      >
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img
        src={img2}
        alt="Shoes"
        className="w-full h-48 object-cover rounded-t-lg"
      />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        to="/admin/product/sdaskdnkasjdn"
        className="text-blue-500 hover:underline"
      >
        Manage
      </Link>
    ),
  },
];

const Products = () => {
  const [rows] = useState<DataType[]>(arr);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {rows.map((row, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-4">
              {row.photo}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{row.name}</h3>
                <p className="text-gray-600 mb-1">Price: ${row.price}</p>
                <p className="text-gray-600 mb-3">Stock: {row.stock}</p>
                <div className="text-right">{row.action}</div>
              </div>
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
