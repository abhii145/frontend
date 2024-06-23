import { IconType } from "react-icons";
import { Location } from "react-router-dom";

declare type LiProps = {
  url: string;
  text: string;
  location: Location<string>;
  Icon: IconType;
};

declare type WidgetItemProps = {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
};

declare type CategoryItemProps = {
  color: string;
  value: number;
  heading: string;
};

declare type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

declare type Product = {
  title: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  photo: string;
  _id: string;
};

declare type AllProductResponse = {
  success: boolean;
  products: Product[];
  totalPage?: number;
};

declare type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

declare type searchProductRequest = {
  price: number;
  category: string;
  search: string;
  sort: string;
  page: number;
};

declare type CartItem = {
  productId: string;
  photo: string;
  title: string;
  price: number;
  quantity: number;
  stock: number;
};

declare type OrderItem = Omit<CartItem, "stock"> & { _id: string };

declare type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

declare type Stats = {
  categoryCount: Record<string, number>[];
  changePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransaction: LatestTransaction[];
};

type OrderFullfillment = {
  processing: number;
  shipped: number;
  delivered: number;
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type UsersAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};

declare type Pie = {
  orderFullfillment: OrderFullfillment;
  productCategories: Record<string, number>[];
  stockAvailablity: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  usersAgeGroup: UsersAgeGroup;
  adminCustomer: {
    admin: number;
    customer: number;
  };
};

declare type Bar = {
  users: number[];
  products: number[];
  orders: number[];
};
declare type Line = {
  users: number[];
  products: number[];
  discount: number[];
  revenue: number[];
};

declare type User = {
  name: string;
  email: string;
  role: string;
  _id: string;
};

declare type UserProps = {
  user: User | null;
  loading?: boolean;
  error?: string | null;
};

declare type NewProductRequest = {
  id: string;
  formData: FormData;
};

declare type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};
declare type DeleteProductRequest = {
  userId: string;
  productId: string;
};
