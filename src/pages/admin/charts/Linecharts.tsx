import { useSelector } from "react-redux";
import { LineChart } from "../../../components/admin/Charts";
import { getLastMonths } from "../../../utils/features";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Linecharts = () => {

const { last12Months, last6Months } = getLastMonths();
const { user } = useSelector((state: RootState) => state.user);

const [lineCharts, setLineCharts] = useState([]);

useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5005/api/v1/dashboard/line?id=${user?._id}`
      );
      const data = await res?.data;
      console.log(data);
      setLineCharts(data);
    } catch (error) {
      toast.error("Failed to fetch stats");
    }
  };
  fetchStats();
}, [user?._id]);

  const products = lineCharts?.charts?.products;
  const users = lineCharts?.charts?.users;
  const revenue = lineCharts?.charts?.revenue;
  const discount = lineCharts?.charts?.discount;



  return (
    <div className="p-8">
      <main className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Line Charts
        </h1>

        <section className="bg-white p-6 rounded-lg shadow-lg space-y-8">
          <LineChart
            data={users}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            labels={months}
            backgroundColor="rgba(53, 162, 255, 0.5)"
          />
          <h2 className="text-xl font-semibold text-gray-700">Active Users</h2>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg space-y-8">
          <LineChart
            data={products}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            labels={months}
            label="Products"
          />
          <h2 className="text-xl font-semibold text-gray-700">
            Total Products (SKU)
          </h2>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg space-y-8">
          <LineChart
            data={revenue}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
            labels={months}
          />
          <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg space-y-8">
          <LineChart
            data={discount}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
            labels={months}
          />
          <h2 className="text-xl font-semibold text-gray-700">
            Discount Allotted
          </h2>
        </section>
      </main>
    </div>
  );
};

export default Linecharts;
