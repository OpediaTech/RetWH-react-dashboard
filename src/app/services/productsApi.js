import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// products service
export const productsApi = createApi({
  reducerPath: "products",
  tagTypes: ["Products"],
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
    // create product
    createProduct: builder.mutation({
      query: (product) => ({
        url: "product",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    // create product
    createBulkProduct: builder.mutation({
      query: (product) => ({
        url: "product/bulk",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    // get products
    getProducts: builder.query({
      query: ({ sort, page, limit }) => ({
        method: "GET",
        url: `product?sort=${sort}&page=${page}&limit=${limit}`,
      }),
      providesTags: ["Products"],
    }),

    // get product by shop id
    getProductByShopId: builder.query({
      query: (pathname) => ({
        method: "GET",
        url: pathname,
      }),
      providesTags: ["Products"],
    }),

    // get products
    getStockProducts: builder.query({
      query: ({ sort, page, shop }) => ({
        method: "GET",
        url: `product?sort=${sort}&page=${page}&shop=${shop}`,
      }),
      providesTags: ["Products"],
    }),

    // update product
    updateProduct: builder.mutation({
      query: ({ prodId, ...product }) => ({
        url: `product?prodId=${prodId}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    // delete product
    deleteProduct: builder.mutation({
      query: (prodId) => ({
        url: `product?prodId=${prodId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

// export elements
export const {
  useCreateProductMutation,
  useCreateBulkProductMutation,
  useGetProductsQuery,
  useGetProductByShopIdQuery,
  useGetStockProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
