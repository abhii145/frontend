import { Product } from "../types";

const ProductCard = ({ product }: Product) => {
  return (
    <div className="max-w-xs bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 mx-auto">
      <img
        className="w-full h-48 object-contain rounded-t-lg"
        src={product.photo}
        alt={product.title}
        loading="lazy"
      />
      <div className="p-4 flex flex-col justify-between h-48">
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <h2 className="text-sm font text-gray-400">
          {product?.description?.slice(0, 120)} ...
          <span className="text-blue-500">Read more</span>
        </h2>
        <p className="text-gray-600 mt-2">₹{product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
