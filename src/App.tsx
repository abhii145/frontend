import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Cart, Auth, Search, Shipping, Orders, Dashboard, Products, Transaction, Customers, NewProducts, ProductManagement, TransactionManagement, Barcharts, Linecharts, Piecharts, Coupon } from "./pages";
import { Suspense } from "react";
import ProductDetails from "./components/ProductDetails";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { AdminSidebar, Header } from "./components";

const App = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <Router>
      <Toaster position="bottom-center" />
      <Suspense fallback={<Loader />}>
        <Header user={user} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* login Routes */}
          <Route path="/auth" element={<Auth />} />

          {/* after login Routes */}
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<Orders />} />

          {/* if user role is admin */}
          <Route  element={<AdminSidebar/>} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/transactions" element={<Transaction />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/product/new" element={<NewProducts />} />
          <Route path="/admin/product/:id" element={<ProductManagement />} />
          <Route
            path="/admin/transaction/:id"
            element={<TransactionManagement />}
          />
          <Route path="/admin/chart/bar" element={<Barcharts />} />
          <Route path="/admin/chart/line" element={<Linecharts />} />
          <Route path="/admin/chart/pie" element={<Piecharts />} />
          <Route path="/admin/app/coupon" element={<Coupon />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
