import {
  RiCoupon3Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa";

const sidebarListData = [
  {
    url: "/admin/dashboard",
    text: "Dashboard",
    Icon: RiDashboardFill,
  },
  {
    url: "/admin/product",
    text: "Product",
    Icon: RiShoppingBag3Fill,
  },
  {
    url: "/admin/customers",
    text: "Customer",
    Icon: IoIosPeople,
  },
  {
    url: "/admin/transactions",
    text: "Transaction",
    Icon: AiFillFileText,
  },
];

const ChartsData = [
  {
    url: "/admin/chart/bar",
    text: "Bar",
    Icon: FaChartBar,
  },
  {
    url: "/admin/chart/pie",
    text: "Pie",
    Icon: FaChartPie,
  },
  {
    url: "/admin/chart/line",
    text: "Line",
    Icon: FaChartLine,
  },
];

const AppsData = [
  {
    url: "/admin/app/coupon",
    text: "coupon",
    Icon: RiCoupon3Fill,
  }
];

const WidgetItemData = [
  {
    percent: 40,
    amount: true,
    value: 340000,
    heading: "Revenue",
    color: "rgb(0,115,255)",
  },
  {
    percent: -14,
    value: 400,
    heading: "Users",
    color: "rgb(0,198,202)",
  },
  {
    percent: 80,
    value: 23000,
    heading: "Transactions",
    color: "rgb(255,196,0)",
  },
  {
    percent: 30,
    value: 1000,
    heading: "Products",
    color: "rgb(76,0,255)",
  },
];

export { sidebarListData, ChartsData, AppsData, WidgetItemData };
