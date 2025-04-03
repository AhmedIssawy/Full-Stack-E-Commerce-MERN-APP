import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    getUsersDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `${USERS_URL}/${userId}`,
        method: "PATCH", //get back
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useProfileMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUsersDetailsQuery,
  useUpdateUserMutation,
} = userApiSlice;
