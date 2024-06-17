import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  Cart,
  Auth,
} from "./pages";
import { Suspense } from "react";
import ProductDetails from "./components/ProductDetails";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import UserLayout from "./components/UserLayout";

const App = () => {



  return (
    <Router>
      <Toaster position="bottom-center" />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
