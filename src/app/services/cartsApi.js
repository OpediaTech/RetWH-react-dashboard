import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// carts service
export const cartsApi = createApi({
  reducerPath: "carts",
  tagTypes: ["Carts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://retwho.herokuapp.com/",
    prepareHeaders: (headers, { getState }) => {
      const {
        userInfo: { token },
      } = getState().auth;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // add to cart
    addToCart: builder.mutation({
      query: (items) => ({
        url: "cart",
        method: "POST",
        body: items,
      }),
      invalidatesTags: ["Carts"],
    }),

    // get carts
    getCarts: builder.query({
      query: () => ({
        url: "cart",
        method: "GET",
      }),
      providesTags: ["Carts"],
    }),

    // update cart
    updateCart: builder.mutation({
      query: (items) => ({
        url: "cart",
        method: "PATCH",
        body: items,
      }),
      invalidatesTags: ["Carts"],
    }),

    // remove item from cart
    removeItemFromCart: builder.mutation({
      query: ({ prodId, cartId }) => ({
        url: `cart?prodId=${prodId}&cid=${cartId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Carts"],
    }),

    // delete cart
    deleteCart: builder.mutation({
      query: (cartId) => ({
        url: `cart?cid=${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

// export elements
export const {
  useAddToCartMutation,
  useGetCartsQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useRemoveItemFromCartMutation,
} = cartsApi;
