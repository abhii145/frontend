import { lazy } from "react";
import TableHOC from "./admin/TableHOC";

const Header = lazy(() => import("./Header"));
const Loader = lazy(() => import("./Loader"));
const AdminSidebar = lazy(() => import("./admin/AdminSidebar"));
const CategoryItem = lazy(() => import("./admin/CategoryItem"));
const DashboardTable = lazy(() => import("./admin/DashboardTable"));
const WidgetItem = lazy(() => import("./admin/WidgetItem"));
const UserLayout = lazy(() => import("./UserLayout"));

export {
  Loader,
  AdminSidebar,
  CategoryItem,
  DashboardTable,
  TableHOC,
  WidgetItem,
  Header,
  UserLayout,
};
