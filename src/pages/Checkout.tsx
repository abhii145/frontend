/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { resetCart } from "../redux/reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_LOAD_STRIPE_KEY);

const CheckoutForm = () => {
  const [isProcessing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const placeOrder = async (orderData: any) => {
    try {
      await axios.post("http://localhost:5005/api/v1/order/new", orderData);
      toast.success("Order Placed Successfully");
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartSlice);

  console.log(
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total
  );

  const { user } = useSelector((state: RootState) => state.user);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setProcessing(true);

    const orderData = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: user?._id,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setProcessing(false);
      return toast.error(error.message || "Something Went Wrong");
    }

    if (paymentIntent.status === "succeeded") {
      // await newOrder(orderData);
      await placeOrder(orderData);
      dispatch(resetCart());
      console.log("Order Placed Successfully");
      navigate("/orders");
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Checkout
      </h2>
      <form onSubmit={submitHandler} className="space-y-6">
        <div className="mb-4">
          <PaymentElement />
        </div>
        <button
          type="submit"
          className={`w-full py-3 rounded-full text-white font-bold transition duration-200 ${
            isProcessing
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();

  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
        }}
      >
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;
