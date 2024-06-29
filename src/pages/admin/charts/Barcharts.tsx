import { useSelector } from "react-redux";
import { BarChart } from "../../../components/admin/Charts";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getLastMonths } from "../../../utils/features";

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

const Barcharts = () => {

const { last12Months, last6Months } = getLastMonths();
 const { user } = useSelector((state: RootState) => state.user);

 const [barCharts, setBarCharts] = useState([]);

 useEffect(() => {
   const fetchStats = async () => {
     try {
       const res = await axios.get(
         `http://localhost:5005/api/v1/dashboard/bar?id=${user?._id}`
       );
       const data = await res?.data;
       console.log(data);
       setBarCharts(data);
     } catch (error) {
       toast.error("Failed to fetch stats");
     }
   };
   fetchStats();
 }, [user?._id]);


  const products = barCharts?.charts?.products;
  const orders = barCharts?.charts?.orders;
  const users = barCharts?.charts?.users;



  return (
    <main className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Bar Charts
      </h1>
      <section className="bg-white p-6 rounded-lg shadow-lg space-y-8">
        <BarChart
          data_1={products}
          data_2={users}
          labels={last6Months}
          title_1="Products"
          title_2="Users"
          bgColor_1={`hsl(260, 50%, 30%)`}
          bgColor_2={`hsl(360, 90%, 90%)`}
        />
        <h2 className="text-xl font-semibold text-gray-700">
          Top Products & Top Customers
        </h2>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-lg space-y-8">
        <BarChart
          horizontal={true}
          data_1={orders}
          data_2={[]}
          title_1="Orders"
          title_2=""
          bgColor_1={`hsl(180, 40%, 50%)`}
          bgColor_2=""
          labels={last12Months}
        />
        <h2 className="text-xl font-semibold text-gray-700">
          Orders throughout the Year
        </h2>
      </section>
    </main>
  );
};

export default Barcharts;
