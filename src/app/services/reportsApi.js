import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// reports service
export const reportsApi = createApi({
  reducerPath: "reports",
  tagTypes: ["Reports"],
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
    // create cart sale
    createCartSale: builder.mutation({
      query: ({ cid, payment_method, ...data }) => ({
        url: `sale?cid=${cid}&method=${payment_method}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),

    // make an order
    makeAnOrder: builder.mutation({
      query: (data) => ({
        url: "sale/direct",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),

    // create pos sale
    createPosSale: builder.mutation({
      query: ({ pid, payment_method, ...data }) => ({
        url: `sale/pos?pid=${pid}&method=${payment_method}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),

    // get reports
    getSaleReports: builder.query({
      query: (pathname) => ({
        url: pathname,
        method: "GET",
      }),
      providesTags: ["Reports"],
    }),

    // get report by id
    getSaleReportById: builder.query({
      query: (id) => ({
        url: `sale/report?sort=1&page=0&_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Reports"],
    }),

    // update status
    updateStatus: builder.mutation({
      query: ({ sid, ...data }) => ({
        url: `sale?sid=${sid}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

// export elements
export const {
  useCreateCartSaleMutation,
  useCreatePosSaleMutation,
  useGetSaleReportsQuery,
  useGetSaleReportByIdQuery,
  useMakeAnOrderMutation,
  useUpdateStatusMutation,
} = reportsApi;
