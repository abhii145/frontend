import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartReducerInitialState, ShippingInfo } from "../../types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter((item) => {
        return item._id !== action.payload;
      });
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );

      if (
        state.cartItems[itemIndex].quantity >= state.cartItems[itemIndex].stock
      )
        return;
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity += 1;
      }
      state.loading = false;
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].quantity > 1)
          state.cartItems[itemIndex].quantity -= 1;
      }
      state.loading = false;
    },
    calculatePrice: (state) => {
      state.subtotal = state.cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      state.tax = state.subtotal * 0.18;
      state.shippingCharges = state.subtotal > 500 ? 0 : 40;
      state.total =
        state.subtotal + state.tax + state.shippingCharges - state.discount;
    },
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeCartItem,
  increaseQuantity,
  decreaseQuantity,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
