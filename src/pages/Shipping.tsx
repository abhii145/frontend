import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const shippingSchema = z.object({
  addressLine1: z.string().min(1, { message: "Required" }),
  addressLine2: z.string().optional(),
  landmark: z.string().optional(),
  city: z.string().min(1, { message: "Required" }),
  state: z.string().min(1, { message: "Required" }),
  country: z.string().min(1, { message: "Required" }),
  pincode: z.string().regex(/^\d{6}$/),
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

  const onSubmit = (data: ShippingFormInputs) => {
    console.log(data);
    // Navigate to payment page or handle submission
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Shipping Details</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-col">
          <label htmlFor="addressLine1" className="mb-2 font-medium">
            Address Line 1
          </label>
          <input
            id="addressLine1"
            type="text"
            {...register("addressLine1")}
            className={`p-2 border rounded ${
              errors.addressLine1 ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.addressLine1 && (
            <p className="text-red-500 mt-1">{errors.addressLine1.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="addressLine2" className="mb-2 font-medium">
            Address Line 2
          </label>
          <input
            id="addressLine2"
            type="text"
            {...register("addressLine2")}
            className="p-2 border rounded border-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="landmark" className="mb-2 font-medium">
            Landmark
          </label>
          <input
            id="landmark"
            type="text"
            {...register("landmark")}
            className="p-2 border rounded border-gray-300"
          />
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
          <label htmlFor="pincode" className="mb-2 font-medium">
            Pincode
          </label>
          <input
            id="pincode"
            type="text"
            {...register("pincode")}
            className={`p-2 border rounded ${
              errors.pincode ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.pincode && (
            <p className="text-red-500 mt-1">{errors.pincode.message}</p>
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
