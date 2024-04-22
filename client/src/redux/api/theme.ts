import { rootApi } from '.';

export const projectApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        updateThemeByProjectId: build.mutation({
            query: ({ projectId, ...body }) => ({
                url: `projects/${projectId}/themes`,
                method: 'PATCH',
                body,
            }),
            
            invalidatesTags: ['THEME'],
            transformResponse: ({ data }) => data,
        }),
        getThemeByProjectId: build.query({
            query: (projectId: string) => `projects/${projectId}/themes`,
            providesTags: ['THEME'],
            transformResponse: ({ data }) => data,
        }),
    }),
});

export const {
    useUpdateThemeByProjectIdMutation,
    useGetThemeByProjectIdQuery,
} = projectApi;
