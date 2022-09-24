import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// dashboard service
export const dashboardApi = createApi({
  reducerPath: "dashboard",
  //   tagTypes: ["Carts"],
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
    // get deshboard data
    getDashboard: builder.query({
      query: () => ({
        url: "dashboard",
        method: "GET",
      }),
      //   providesTags: ["Carts"],
    }),

    // get deshboard data
    getDashboardSales: builder.query({
      query: (pathname) => ({
        url: pathname,
        method: "GET",
      }),
      //   providesTags: ["Carts"],
    }),
  }),
});

// export elements
export const { useGetDashboardQuery, useGetDashboardSalesQuery } = dashboardApi;
