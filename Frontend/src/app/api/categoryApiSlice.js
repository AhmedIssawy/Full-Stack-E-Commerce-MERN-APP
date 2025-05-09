import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (name) => ({
        url: `${CATEGORIES_URL}`,
        method: "POST",
        body: name,
      }),
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}`,
        method: "GET",
      }),
    }),
    getOneCategory: builder.query({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "GET",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "PUT",
        body: name,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetOneCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
