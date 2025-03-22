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
       body: data
      }),
    }),
  }),
});

export const {
  useProfileMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = userApiSlice;
