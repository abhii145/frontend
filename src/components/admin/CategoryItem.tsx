import { CategoryItemProps } from "../../types";

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => {
  return (
    <div className="flex flex-col mb-4">
      <h5 className="text-gray-600">{heading}</h5>
      <div className="w-full bg-gray-200 rounded h-2 mb-2">
        <div
          className="h-full rounded"
          style={{
            backgroundColor: color,
            width: `${value}%`,
          }}
        ></div>
      </div>
      <span className="text-gray-600">{value}%</span>
    </div>
  );
};

export default CategoryItem;
