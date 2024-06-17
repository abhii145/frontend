import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import userImg from "../../assets/userpic.png";
import { BiMaleFemale } from "react-icons/bi";
import { WidgetItemData } from "../../constants";
import WidgetItem from "../../components/admin/WidgetItem";
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import CategoryItem from "../../components/admin/CategoryItem";
import data from '../../assets/data.json'
import Table from "../../components/admin/DashboardTable";

const DashBoard = () => {
  return (
    <>
      <main className="dashboard">
        <div className="bar">
          <BsSearch />

          <input type="search" placeholder="Search" />
          <FaRegBell />
          <img src={userImg} alt="Profile" loading="lazy" />
        </div>

        <section className="widget-container">
          {WidgetItemData.map((item) => {
            return (
              <WidgetItem
                key={item.heading}
                percent={item.percent}
                amount={item.amount}
                value={item.value}
                heading={item.heading}
                color={item.color}
              />
            );
          })}
        </section>

        <section className="graph-container">
          <div className="revenue-chart">
            <h2>Revenue & Transaction</h2>
            <BarChart
              data_2={[300, 144, 433, 655, 237, 755, 190]}
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)"
            />
          </div>

          <div className="dashboard-categories">
            <h2>Inventory</h2>
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

        <section className="transaction-container">
          <div className="gender-chart">
            <h2>Gender Ratio</h2>

            <DoughnutChart
              labels={["Female", "Male"]}
              data={[12, 19]}
              backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
              cutout={90}
            />

            <p>
              <BiMaleFemale />
            </p>
          </div>

          <Table data={data.transaction} />
        </section>
      </main>
    </>
  );
};

export default DashBoard;
