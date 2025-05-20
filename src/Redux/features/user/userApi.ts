import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({
        url: "/users/me",
      }),
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const { useGetUserDataQuery } = userApi;
