import { z } from "zod";

const orderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pinCode: z.number().min(1, "PinCode is required"),
  status: z.enum(["Processing", "Shipped", "Delivered"]),
  subtotal: z.number().min(0),
  discount: z.number().min(0),
  shippingCharges: z.number().min(0),
  tax: z.number().min(0),
  total: z.number().min(0),
  orderItems: z.array(
    z.object({
      name: z.string(),
      photo: z.string(),
      _id: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ),
  _id: z.string(),
});

export { orderSchema };
