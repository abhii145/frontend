import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import data from "../../../assets/data.json";

const PieCharts = () => {
  return (
    <div className="p-4">
      <main className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <section className="bg-white p-2 rounded-lg shadow-md">
          <h1 className="text-lg font-bold text-center text-gray-900 mb-2">
            Order Fulfillment Ratio
          </h1>
          <PieChart
            labels={["Processing", "Shipped", "Delivered"]}
            data={[12, 9, 13]}
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
            labels={data.categories.map((i) => i.heading)}
            data={data.categories.map((i) => i.value)}
            backgroundColor={data.categories.map(
              (i) => `hsl(${i.value * 4}, ${i.value}%, 50%)`
            )}
            legends={false}
            cutout="70%"
          />
        </section>

        <section className="bg-white p-2 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-center text-gray-900 mb-2">
            Stock Availability
          </h2>
          <DoughnutChart
            labels={["In Stock", "Out Of Stock"]}
            data={[40, 20]}
            backgroundColor={["hsl(269, 80%, 40%)", "rgb(53, 162, 255)"]}
            legends={false}
            cutout="70%"
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
            data={[32, 18, 5, 20, 25]}
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
            Users Age Group
          </h2>
          <PieChart
            labels={[
              "Teenager (Below 20)",
              "Adult (20-40)",
              "Older (above 40)",
            ]}
            data={[30, 250, 70]}
            backgroundColor={[
              `hsl(10, 80%, 80%)`,
              `hsl(10, 80%, 50%)`,
              `hsl(10, 40%, 50%)`,
            ]}
          />
        </section>

        <section className="bg-white p-2 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-center text-gray-900 mb-2">
            User Role Distribution
          </h2>
          <DoughnutChart
            labels={["Admin", "Customers"]}
            data={[40, 250]}
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
