import { apiSlice } from "./apiSlice.js";
import { PRODUCTS_URL, UPLOADS_URL } from "../constants.js";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/allproducts`,
      }),
    }),
    getSpeseficProduct: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
    }),
    getPageOfProducts: builder.query({
      query: (page) => ({
        url: `${PRODUCTS_URL}?page=${page}`,
      }),
    }),
    getFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${PRODUCTS_URL}/filtered-products`,
        method: "POST",
        body: { checked, radio },
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    createReview: builder.mutation({
      query: ({ productId, data }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: "POST",
        body: data,
      }),
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
    }),
    getNewestProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/newest`,
      }),
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSpeseficProductQuery,
  useGetPageOfProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewestProductsQuery,
  useUploadImageMutation,
  useGetFilteredProductsQuery,
} = productApiSlice;
