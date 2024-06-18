import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import userImg from "../../assets/userpic.png";
import { WidgetItemData } from "../../constants";
import WidgetItem from "../../components/admin/WidgetItem";
import { BarChart } from "../../components/admin/Charts";
import CategoryItem from "../../components/admin/CategoryItem";
import data from "../../assets/data.json";

const DashBoard = () => {
  return (
    <>
      <main className="flex flex-col p-4 space-y-4">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2">
            <BsSearch className="text-gray-500" />
            <input
              type="search"
              placeholder="Search"
              className="outline-none"
            />
          </div>
          <div className="flex items-center space-x-4">
            <FaRegBell className="text-gray-500" />
            <img
              src={userImg}
              alt="Profile"
              className="w-8 h-8 rounded-full"
              loading="lazy"
            />
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WidgetItemData.map((item) => (
            <WidgetItem
              key={item.heading}
              percent={item.percent}
              amount={item.amount}
              value={item.value}
              heading={item.heading}
              color={item.color}
            />
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Revenue & Transaction
            </h2>
            <BarChart
              data_2={[300, 144, 433, 655, 237, 755, 190]}
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Inventory</h2>
            <div>
              {data.categories.map((i) => (
                <CategoryItem
                  key={i.heading}
                  heading={i.heading}
                  value={i.value}
                  color={`hsl(${i.value * 4},${i.value}%,50%)`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DashBoard;
