import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// requests service
export const requestsApi = createApi({
  reducerPath: "requests",
  tagTypes: ["Requests"],
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
    // add request
    addRequest: builder.mutation({
      query: ({ shopId, ...request }) => ({
        url: `request?shopId=${shopId}`,
        method: "POST",
        body: request,
      }),
      invalidatesTags: ["Requests"],
    }),
    // admin request
    adminRequest: builder.mutation({
      query: (request) => ({
        url: `request/connect`,
        method: "POST",
        body: request,
      }),
      invalidatesTags: ["Requests"],
    }),

    // admin request
    wholesalerRequest: builder.mutation({
      query: ({ shopId, ...request }) => ({
        url: `request?shopId=${shopId}`,
        method: "POST",
        body: request,
      }),
      invalidatesTags: ["Requests"],
    }),

    // get requests
    getRequests: builder.query({
      query: () => ({
        url: "request",
        method: "GET",
      }),
      providesTags: ["Requests"],
    }),

    // update request
    updateRequest: builder.mutation({
      query: ({ rid, ...request }) => ({
        url: `request?rid=${rid}`,
        method: "PUT",
        body: request,
      }),
      invalidatesTags: ["Requests"],
    }),
  }),
});

// export elements
export const {
  useAddRequestMutation,
  useAdminRequestMutation,
  useWholesalerRequestMutation,
  useGetRequestsQuery,
  useUpdateRequestMutation,
} = requestsApi;
