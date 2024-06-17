import { lazy } from "react";

const Cart = lazy(() => import("./Cart"));
const Shipping = lazy(() => import("./Shipping"));
const Auth = lazy(() => import("./Auth"));
const Orders = lazy(() => import("./Orders"));
const Home = lazy(() => import("./Home"));


export { Cart, Shipping, Auth, Orders,Home };

