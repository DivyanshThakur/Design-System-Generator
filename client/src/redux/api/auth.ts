import { rootApi } from '.';

export const authApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (body: any) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['THEME', 'COMPONENTS', 'PROJECT_LIST'],
            transformResponse: (response: any) => response.data,
        }),
        register: build.mutation({
            query: (body: any) => ({
                url: 'auth/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['THEME', 'COMPONENTS', 'PROJECT_LIST'],
            transformResponse: (response: any) => response.data,
        }),
        logout: build.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['THEME', 'COMPONENTS', 'PROJECT_LIST'],
        }),
        refreshToken: build.mutation({
            query: () => ({
                url: 'auth/refresh-token',
                method: 'POST',
            }),
            transformResponse: (response: any) => response.data,
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
} = authApi;
