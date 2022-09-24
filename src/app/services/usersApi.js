import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// users service
export const usersApi = createApi({
  reducerPath: "users",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://retwho.herokuapp.com/",
    prepareHeaders: (headers, { getState }) => {
      const { userInfo } = getState().auth;

      if (userInfo?.token) {
        headers.set("authorization", `Bearer ${userInfo?.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // add user
    addUser: builder.mutation({
      query: (user) => ({
        url: "user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),

    // get users
    getUsers: builder.query({
      query: (pathname) => ({
        url: `${pathname}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // get auth users
    getAuthUser: builder.query({
      query: (email) => ({
        url: `auth/user?email=${email}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // get user by role
    getUserByRole: builder.query({
      query: (pathname) => ({
        url: pathname,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // update user
    updateUser: builder.mutation({
      query: (user) => ({
        url: `user`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),

    // admin update user
    adminUpdateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: `register?_id=${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),

    // delete user
    deleteUser: builder.mutation({
      query: (email) => ({
        url: `user?email=${email}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// export elements
export const {
  useAddUserMutation,
  useGetUsersQuery,
  useGetAuthUserQuery,
  useGetUserByRoleQuery,
  useUpdateUserMutation,
  useAdminUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
