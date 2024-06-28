import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../redux/reducer/cartSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

const shippingSchema = z.object({
  address: z.string().min(1, { message: "Required" }),
  city: z.string().min(1, { message: "Required" }),
  state: z.string().min(1, { message: "Required" }),
  country: z.string().min(1, { message: "Required" }),
  pinCode: z.string().regex(/^\d{6}$/),
});

type ShippingFormInputs = z.infer<typeof shippingSchema>;

const Shipping: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingSchema),
  });

  const { cartItems } = useSelector((state: RootState) => state.cartSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems.length, navigate]);

  const disptach = useDispatch();

  const onSubmit = (data: ShippingFormInputs) => {
    disptach(saveShippingInfo(data));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Shipping Details</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-col">
          <label htmlFor="address" className="mb-2 font-medium">
            Full Address
          </label>
          <input
            id="address"
            type="text"
            {...register("address")}
            className={`p-2 border rounded ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 mt-1">{errors.address.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="city" className="mb-2 font-medium">
            City
          </label>
          <input
            id="city"
            type="text"
            {...register("city")}
            className={`p-2 border rounded ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.city && (
            <p className="text-red-500 mt-1">{errors.city.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="state" className="mb-2 font-medium">
            State
          </label>
          <input
            id="state"
            type="text"
            {...register("state")}
            className={`p-2 border rounded ${
              errors.state ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.state && (
            <p className="text-red-500 mt-1">{errors.state.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="country" className="mb-2 font-medium">
            Country
          </label>
          <input
            id="country"
            type="text"
            {...register("country")}
            className={`p-2 border rounded ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.country && (
            <p className="text-red-500 mt-1">{errors.country.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="pinCode" className="mb-2 font-medium">
            Pincode
          </label>
          <input
            id="pinCode"
            type="text"
            {...register("pinCode")}
            className={`p-2 border rounded ${
              errors.pinCode ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.pinCode && (
            <p className="text-red-500 mt-1">{errors.pinCode.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Shipping;
