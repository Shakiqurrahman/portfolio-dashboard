import { baseApi } from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (projectInfo) => ({
        url: "/projects",
        method: "POST",
        body: projectInfo,
      }),
    }),

    getAllProjects: builder.query({
      query: () => ({
        url: "/projects",
      }),
    }),

    getProjectById: builder.query({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
      }),
    }),

    updateProject: builder.mutation({
      query: ({ projectId, payload }) => ({
        url: `/projects/${projectId}`,
        method: "PUT",
        body: payload,
      }),
    }),

    deleteProject: builder.mutation({
      query: (blogId) => ({
        url: `/projects/${blogId}`,
        method: "DELETE",
      }),
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
