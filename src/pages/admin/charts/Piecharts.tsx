import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import data from "../../../assets/data.json";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [pieChartsStats, setPieChartsStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5005/api/v1/dashboard/pie?id=${user?._id}`
        );
        const data = await res?.data;
        console.log(data);
        setPieChartsStats(data);
      } catch (error) {
        toast.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, [user?._id]);

  const order = pieChartsStats.charts?.orderFullfillment;
  const stock = pieChartsStats?.charts?.stockAvailablity;
  const revenue = pieChartsStats?.charts?.revenueDistribution;
  const adminCustomer = pieChartsStats?.charts?.adminCustomer;

  return (
    <div className="p-4">
      <main className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <section className="bg-white p-2 rounded-lg shadow-md">
          <h1 className="text-lg font-bold text-center text-gray-900 mb-2">
            Order Fulfillment Ratio
          </h1>
          <PieChart
            labels={["Processing", "Shipped", "Delivered"]}
            data={[order?.processing, order?.shipped, order?.delivered]}
            backgroundColor={[
              `hsl(110, 80%, 80%)`,
              `hsl(110, 80%, 50%)`,
              `hsl(110, 40%, 50%)`,
            ]}
          />
        </section>

        <section className="bg-white p-2 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-center text-gray-900 mb-2">
            Product Categories Ratio
          </h2>
          <DoughnutChart
            labels={pieChartsStats?.charts?.productCategories.map(
              (i) => Object.keys(i)[0]
            )}
            data={pieChartsStats?.charts?.productCategories.map(
              (i) => Object.values(i)[0]
            )}
            backgroundColor={data.categories.map(
              (i) => `hsl(${i.value * 4}, ${i.value}%, 50%)`
            )}
            legends={false}
            cutout="80%"
          />
        </section>

        <section className="bg-white p-2 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-center text-gray-900 mb-2">
            Stock Availability
          </h2>
          <DoughnutChart
            labels={["In Stock", "Out Of Stock"]}
            data={[stock?.inStock, stock?.outOfStock]}
            backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
            legends={false}
            offset={[0, 80]}
            cutout={"70%"}
          />
        </section>

        <section className="bg-white p-2 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-center text-gray-900 mb-2">
            Revenue Distribution
          </h2>
          <DoughnutChart
            labels={[
              "Marketing Cost",
              "Discount",
              "Burnt",
              "Production Cost",
              "Net Margin",
            ]}
            data={[
              revenue?.marketingCost,
              revenue?.discount,
              revenue?.burnt,
              revenue?.productionCost,
              revenue?.netMargin,
            ]}
            backgroundColor={[
              "hsl(110, 80%, 40%)",
              "hsl(19, 80%, 40%)",
              "hsl(69, 80%, 40%)",
              "hsl(300, 80%, 40%)",
              "rgb(53, 162, 255)",
            ]}
            legends={false}
            cutout="70%"
          />
        </section>

        <section className="bg-white p-2 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-center text-gray-900 mb-2">
            User Role Distribution
          </h2>
          <DoughnutChart
            labels={["Admin", "Customers"]}
            data={[adminCustomer?.admin, adminCustomer?.customer]}
            backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
            cutout="70%"
            legends={false}
          />
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
