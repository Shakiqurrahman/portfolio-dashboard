import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (blogInfo) => ({
        url: "/blogs",
        method: "POST",
        body: blogInfo,
      }),
      invalidatesTags: ["blog"],
    }),

    getAllBlogs: builder.query({
      query: () => ({
        url: "/blogs",
      }),
      providesTags: ["blog"],
    }),

    getBlogById: builder.query({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
      }),
      transformResponse: (res) => res?.data,
      providesTags: ["blog"],
    }),

    updateBlog: builder.mutation({
      query: ({ blogId, payload }) => ({
        url: `/blogs/${blogId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
