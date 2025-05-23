import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (blogInfo) => ({
        url: "/blogs",
        method: "POST",
        body: blogInfo,
      }),
    }),

    getAllBlogs: builder.query({
      query: () => ({
        url: "/blogs",
      }),
    }),

    getBlogById: builder.query({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
      }),
    }),

    updateBlog: builder.mutation({
      query: ({ blogId, payload }) => ({
        url: `/blogs/${blogId}`,
        method: "PUT",
        body: payload,
      }),
    }),

    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
      }),
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
