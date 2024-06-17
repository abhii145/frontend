/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";

const cartItem = [
  {
    id: 1,
    title: "Apple iPhone 12",
    price: 40000,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    quantity: 1,
  },
  {
    id: 2,
    title: "Apple iPhone 11",
    price: 30000,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    quantity: 1,
  },
  {
    id: 3,
    title: "Apple iPhone 11 Pro",
    price: 50000,
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    quantity: 1,
  },
];

const subTotal = 40000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const discount = 100;
const total = subTotal + tax + shippingCharges;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);

  return (
    <div className="container mx-auto p-4">
      <main className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        <div className="flex-1 space-y-4">
          {cartItem.length === 0 ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
            </div>
          ) : (
            cartItem.map((item) => (
              <CartItems
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
              />
            ))
          )}
        </div>

        <aside className="bg-white p-6 rounded-lg shadow-md lg:w-1/3 flex-shrink-0">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <p className="flex justify-between text-lg">
              <span>Subtotal:</span> <span>${subTotal}</span>
            </p>
            <p className="flex justify-between text-lg">
              <span>Shipping Charges:</span> <span>${shippingCharges}</span>
            </p>
            <p className="flex justify-between text-lg">
              <span>Discount:</span> <span>-${discount}</span>
            </p>
            <p className="flex justify-between text-lg">
              <span>Tax:</span> <span>${tax}</span>
            </p>
            <p className="flex justify-between text-xl font-semibold border-t pt-2 mt-2">
              <span>Total:</span> <span>${total}</span>
            </p>
          </div>

          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter Coupon Code"
            className="w-full p-2 mt-4 border rounded"
          />

          {couponCode && (
            <div className="mt-4">
              {isValidCoupon ? (
                <span className="text-green-600">
                  ${discount} off using the <code>{couponCode}</code>
                </span>
              ) : (
                <p className="text-red-600 flex items-center">
                  Invalid Coupon <VscError className="ml-2" />
                </p>
              )}
            </div>
          )}

          <button className="w-full mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            <Link to="/shipping">Proceed to Shipping</Link>
          </button>
        </aside>
      </main>
    </div>
  );
};

export default Cart;
