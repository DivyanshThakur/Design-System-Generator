import { rootApi } from '.';

export const projectApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getAllComponents: build.query({
            query: (projectId: string) => `projects/${projectId}/components`,
            providesTags: ['COMPONENTS'],
            transformResponse: ({ data }) => data,
        }),
        updateComponentByProjectId: build.mutation({
            query: ({ projectId, componentId, ...body }) => ({
                url: `projects/${projectId}/components/${componentId}`,
                method: 'PATCH',
                body,
            }),

            invalidatesTags: ['COMPONENTS'],
            transformResponse: ({ data }) => data,
        }),
    }),
});

export const {
    useGetAllComponentsQuery,
    useUpdateComponentByProjectIdMutation,
} = projectApi;
