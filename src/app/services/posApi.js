import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// pos service
export const posApi = createApi({
  reducerPath: "pos",
  tagTypes: ["Pos"],
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
    // add to pos cart
    addPos: builder.mutation({
      query: (items) => ({
        url: "pos",
        method: "POST",
        body: items,
      }),
      invalidatesTags: ["Pos"],
    }),

    // get pos cart
    getPos: builder.query({
      query: (posId) => ({
        url: `pos?posId=${posId}`,
        method: "GET",
      }),
      providesTags: ["Pos"],
    }),

    // get pos pdf
    getPosPdf: builder.mutation({
      query: (posId) => ({
        url: `pos/document?posId=${posId}`,
        method: "GET",
      }),
      providesTags: ["Pos"],
    }),

    // update pos cart
    updatePos: builder.mutation({
      query: ({ posId, items }) => ({
        url: `pos?posId=${posId}`,
        method: "PUT",
        body: items,
      }),
      invalidatesTags: ["Pos"],
    }),

    // delete pos
    deletePos: builder.mutation({
      query: (posId) => ({
        url: `pos?posId=${posId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

// export elements
export const {
  useAddPosMutation,
  useGetPosQuery,
  useGetPosPdfMutation,
  useUpdatePosMutation,
  useDeletePosMutation,
} = posApi;
