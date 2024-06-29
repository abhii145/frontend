import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import userImg from "../../assets/userpic.png";
import { WidgetItemData } from "../../constants";
import WidgetItem from "../../components/admin/WidgetItem";
import { BarChart } from "../../components/admin/Charts";
import CategoryItem from "../../components/admin/CategoryItem";
import data from "../../assets/data.json";
import { useStatsQuery } from "../../redux/api/dashboardAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DashBoard = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [dashboardStats, setDashboardStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5005/api/v1/dashboard/stats?id=${user?._id}`
        );
        const data = await res?.data.stats;
        console.log(data);
        setDashboardStats(data);
      } catch (error) {
        toast.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, [user?._id]);

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
          {/* {WidgetItemData.map((item) => ( */}
          <WidgetItem
            percent={dashboardStats.changePercent?.revenue}
            amount={true}
            value={dashboardStats.count?.revenue}
            heading="Revenue"
            color="rgb(0,115,255)"
          />

          <WidgetItem
            percent={dashboardStats.changePercent?.user}
            value={dashboardStats.count?.user}
            heading="Users"
            color="rgb(0 198 202)"
          />

          <WidgetItem
            percent={dashboardStats.changePercent?.order}
            value={dashboardStats.count?.order}
            color="rgb(255 196 0)"
            heading="Transactions"
          />
          {/* ))} */}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Revenue & Transaction
            </h2>
            <BarChart
              data_1={dashboardStats.chart?.revenue}
              data_2={dashboardStats.chart?.order}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Inventory</h2>
            <div>
              {dashboardStats.categoryCount?.map((i) => {
                const [heading, value] = Object.entries(i)[0];
                return (
                  <CategoryItem
                    key={heading}
                    value={value}
                    heading={heading}
                    color={`hsl(${value * 4}, ${value}%, 50%)`}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DashBoard;
