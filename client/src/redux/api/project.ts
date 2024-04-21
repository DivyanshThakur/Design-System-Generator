import { rootApi } from '.';

export const projectApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        createProject: build.mutation({
            query: (body: any) => ({
                url: 'projects',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['PROJECT_LIST'],
            transformResponse: (response: any) => response.data,
        }),
        getAllProjects: build.query<any, void>({
            query: () => 'projects',
            providesTags: ['PROJECT_LIST'],
            transformResponse: ({ data }) => data,
        }),
        getProjectById: build.query({
            query: (id: string) => `projects/${id}`,
            providesTags: ['PROJECT_LIST'],
            transformResponse: ({ data }) => data,
        }),
    }),
});

export const { useCreateProjectMutation, useGetAllProjectsQuery , useGetProjectByIdQuery } = projectApi;
