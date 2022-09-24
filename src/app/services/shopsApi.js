import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// shops service
export const shopsApi = createApi({
  reducerPath: "shops",
  tagTypes: ["Shops"],
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
    // add shop
    addShop: builder.mutation({
      query: (shop) => ({
        url: "shop",
        method: "POST",
        body: shop,
      }),
      invalidatesTags: ["Shops"],
    }),

    // get shops
    getShops: builder.query({
      query: () => ({
        url: "shop?sort=1&page=0",
        method: "GET",
      }),
      providesTags: ["Shops"],
    }),

    // get shops
    getShopsByAdmin: builder.query({
      query: (pathname) => ({
        url: pathname,
        method: "GET",
      }),
      providesTags: ["Shops"],
    }),

    // get shops by email
    getShopsByEmail: builder.query({
      query: (email) => ({
        url: `shop?sort=1&page=0&email=${email}`,
        method: "GET",
      }),
      providesTags: ["Shops"],
    }),

    // get shops by email
    getShopsByRole: builder.query({
      query: (role) => ({
        url: `shop?sort=1&page=0&role=${role}`,
        method: "GET",
      }),
      providesTags: ["Shops"],
    }),

    // update shop
    updateShop: builder.mutation({
      query: ({ shopId, ...shop }) => ({
        url: `shop?shopId=${shopId}`,
        method: "PUT",
        body: shop,
      }),
      invalidatesTags: ["Shops"],
    }),

    // delete shop
    deleteShop: builder.mutation({
      query: (shopId) => ({
        url: `shop?shopId=${shopId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Shops"],
    }),
  }),
});

// export elements
export const {
  useAddShopMutation,
  useGetShopsQuery,
  useGetShopsByEmailQuery,
  useGetShopsByRoleQuery,
  useGetShopsByAdminQuery,
  useUpdateShopMutation,
  useDeleteShopMutation,
} = shopsApi;
