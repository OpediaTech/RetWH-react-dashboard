import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// departments service
export const departmentsApi = createApi({
  reducerPath: "departments",
  tagTypes: ["Departments"],
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
    // create department
    createDepartment: builder.mutation({
      query: (department) => ({
        url: "department",
        method: "POST",
        body: department,
      }),
      invalidatesTags: ["Departments"],
    }),

    // get departments
    getDepartments: builder.query({
      query: () => ({
        url: "department",
        method: "GET",
      }),
      providesTags: ["Departments"],
    }),

    // get departments
    getDepartmentByShop: builder.query({
      query: (shopId) => ({
        url: `department?shop=${shopId}`,
        method: "GET",
      }),
      providesTags: ["Departments"],
    }),

    // update department
    updateDepartment: builder.mutation({
      query: ({ deptID, ...department }) => ({
        url: `department?deptId=${deptID}`,
        method: "PUT",
        body: department,
      }),
      invalidatesTags: ["Departments"],
    }),

    // delete department
    deleteDepartment: builder.mutation({
      query: (deptID) => ({
        url: `department?deptId=${deptID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Departments"],
    }),
  }),
});

// export elements
export const {
  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
  useGetDepartmentByShopQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApi;
