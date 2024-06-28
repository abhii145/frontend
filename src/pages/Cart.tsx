import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import CartItems from "../components/CartItems";
import { RootState } from "../redux/store";
import { calculatePrice, discountApplied } from "../redux/reducer/cartSlice";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, subtotal, tax, shippingCharges, total, discount } =
    useSelector((state: RootState) => state.cartSlice);

  const methods = useForm({
    defaultValues: {
      couponCode: localStorage.getItem("couponCode") || "",
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <main className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
          <div className="flex-1 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center">
                <h2 className="text-xl font-semibold">Your cart is empty</h2>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItems
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  price={item.price}
                  photo={item.photo}
                  quantity={item.quantity}
                />
              ))
            )}
          </div>

          {cartItems.length !== 0 && (
            <OrderSummary
              subtotal={subtotal}
              shippingCharges={shippingCharges}
              discount={discount}
              tax={tax}
              total={total}
              dispatch={dispatch}
            />
          )}
        </main>
      </div>
    </FormProvider>
  );
};

const OrderSummary = ({
  subtotal,
  shippingCharges,
  discount,
  tax,
  total,
  dispatch,
}) => {
  const { register, watch, setValue } = useFormContext();
  const couponCode = watch("couponCode");
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);

  useEffect(() => {
    if (couponCode) {
      localStorage.setItem("couponCode", couponCode);
    } else {
      localStorage.removeItem("couponCode");
    }
  }, [couponCode]);

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKENDSERVER_URL
          }/payment/discount?coupon=${couponCode}`,
          {
            cancelToken,
          }
        );
        const data = await res.data;
        dispatch(discountApplied(data.discount));
        setIsValidCoupon(true);
        dispatch(calculatePrice());
      } catch (error) {
        dispatch(discountApplied(0));
        setIsValidCoupon(false);
        dispatch(calculatePrice());
      }
    };

    if (couponCode) {
      const timeOutID = setTimeout(() => {
        fetchData();
      }, 100);

      return () => {
        clearTimeout(timeOutID);
        cancel();
        setIsValidCoupon(false);
      };
    }
  }, [couponCode, dispatch]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [dispatch]);

  return (
    <aside className="bg-white p-6 rounded-lg shadow-md lg:w-1/3 flex-shrink-0">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <p className="flex justify-between text-lg">
          <span>Subtotal:</span> <span>₹{subtotal}</span>
        </p>
        <p className="flex justify-between text-lg">
          <span>Shipping Charges:</span> <span>₹{shippingCharges}</span>
        </p>
        <p className="flex justify-between text-lg">
          <span>Discount:</span> <span>-₹{discount}</span>
        </p>
        <p className="flex justify-between text-lg">
          <span>Tax:</span> <span>₹{tax}</span>
        </p>
        <p className="flex justify-between text-xl font-semibold border-t pt-2 mt-2">
          <span>Total:</span> <span>₹{total}</span>
        </p>
      </div>

      <input
        type="text"
        {...register("couponCode")}
        placeholder="Enter Coupon Code"
        className="w-full p-2 mt-4 border rounded"
      />

      {couponCode && (
        <div className="mt-4">
          {isValidCoupon ? (
            <span className="text-green-600">
              ₹{discount} off using the <code>{couponCode}</code>
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
  );
};

export default Cart;
