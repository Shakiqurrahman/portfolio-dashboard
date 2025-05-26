import { baseApi } from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (projectInfo) => ({
        url: "/projects",
        method: "POST",
        body: projectInfo,
      }),
      invalidatesTags: ["project"],
    }),

    getAllProjects: builder.query({
      query: () => ({ url: "/projects" }),
      providesTags: ["project"],
    }),

    getProjectById: builder.query({
      query: (projectId) => ({ url: `/projects/${projectId}` }),
      providesTags: ["project"],
      transformResponse: (res) => res.data,
    }),

    updateProject: builder.mutation({
      query: ({ projectId, payload }) => ({
        url: `/projects/${projectId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["project"],
    }),

    deleteProject: builder.mutation({
      query: (blogId) => ({
        url: `/projects/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
