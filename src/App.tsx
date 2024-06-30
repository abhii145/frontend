import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Loader from "./components/Loader";
import {
  Home,
  Cart,
  Auth,
  Search,
  Shipping,
  Orders,
  Dashboard,
  Products,
  Transaction,
  Customers,
  NewProducts,
  ProductManagement,
  TransactionManagement,
  Barcharts,
  Linecharts,
  Piecharts,
  Coupon,
  AdminLayout,
} from "./pages";
import {
  AdminProtectedRoute,
  PrivateLayout,
  PublicLayout,
} from "./ProtectedRoutes";
import ProductDetail from "./components/ProductDetails";
import NotFound from "./components/NotFound";
import Checkout from "./pages/Checkout";

const App = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Toaster position="bottom-center" />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route
            element={
              <PublicLayout
                user={user}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search searchQuery={searchQuery}/>} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/auth" element={<Auth />} />

          {/* Private Routes */}
          <Route element={<PrivateLayout />}>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<Orders />} />
            <Route path="/pay" element={<Checkout />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              element={
                <AdminProtectedRoute
                  isAuthenticated
                  adminOnly
                  admin={user?.role === "admin" ? true : false}
                />
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="product" element={<Products />} />
              <Route path="transactions" element={<Transaction />} />
              <Route path="customers" element={<Customers />} />
              <Route path="product/new" element={<NewProducts />} />
              <Route path="product/:id" element={<ProductManagement />} />
              <Route
                path="transaction/:id"
                element={<TransactionManagement />}
              />
              <Route path="chart/bar" element={<Barcharts />} />
              <Route path="chart/line" element={<Linecharts />} />
              <Route path="chart/pie" element={<Piecharts />} />
              <Route path="app/coupon" element={<Coupon />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
