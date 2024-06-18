import { BarChart } from "../../../components/admin/Charts";

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
  return (
    <main className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Bar Charts
      </h1>
      <section className="bg-white p-6 rounded-lg shadow-lg space-y-8">
        <BarChart
          data_2={[300, 144, 433, 655, 237, 755, 190]}
          data_1={[200, 444, 343, 556, 778, 455, 990]}
          title_1="Products"
          title_2="Users"
          bgColor_1="hsl(260, 50%, 30%)"
          bgColor_2="hsl(360, 90%, 90%)"
        />
        <h2 className="text-xl font-semibold text-gray-700">
          Top Products & Top Customers
        </h2>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-lg space-y-8">
        <BarChart
          horizontal={true}
          data_1={[200, 444, 343, 556, 778, 455, 990, 444, 122, 334, 890, 909]}
          data_2={[]}
          title_1="Orders"
          title_2=""
          bgColor_1="hsl(180, 40%, 50%)"
          bgColor_2=""
          labels={months}
        />
        <h2 className="text-xl font-semibold text-gray-700">
          Orders throughout the Year
        </h2>
      </section>
    </main>
  );
};

export default Barcharts;
