import {
  AllOrderResponse,
  NewOrderRequest,
  UpdateOrderRequest,
} from "../../types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const orderAPI = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKENDSERVER_URL}/order/`,
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<AllOrderResponse, NewOrderRequest>({
      query: (order) => ({
        url: `new`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    myOrder: builder.query<AllOrderResponse, string>({
      query: (id) => `myorders?id=${id}`,
      providesTags: ["Orders"],
    }),
    allOrders: builder.query<AllOrderResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["Orders"],
    }),
    orderDetails: builder.query<AllOrderResponse, string>({
      query: (id) => `order/${id}`,
      providesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation<AllOrderResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation<AllOrderResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useMyOrderQuery,
  useAllOrdersQuery,
  useOrderDetailsQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} = orderAPI;
