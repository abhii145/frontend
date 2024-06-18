import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { WidgetItemProps } from "../../types";

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => {
  return (
    <article className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <p className="text-gray-500">{heading}</p>
        <h4 className="text-xl font-bold">{amount ? `$${value}` : value}</h4>
        {percent > 0 ? (
          <span className="text-green-500 flex items-center">
            <HiTrendingUp className="mr-1" /> +{percent}%
          </span>
        ) : (
          <span className="text-red-500 flex items-center">
            <HiTrendingDown className="mr-1" /> {percent}%
          </span>
        )}
      </div>

      <div className="relative w-16 h-16">
        <svg className="absolute top-0 left-0 w-full h-full">
          <circle
            className="text-gray-200"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="28"
            cx="32"
            cy="32"
          />
          <circle
            className="text-blue-500"
            strokeWidth="4"
            strokeDasharray={`${(percent / 100) * 175}, 175`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="28"
            cx="32"
            cy="32"
            style={{ stroke: color }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center text-xl font-semibold"
          style={{ color }}
        >
          {percent}%
        </div>
      </div>
    </article>
  );
};

export default WidgetItem;
