import {
    BaseQueryFn,
    FetchBaseQueryError,
    BaseQueryApi,
    FetchArgs,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query';

import {
    getUserAuth,
    removeUserAuth,
    saveUserAuth,
} from '../../utils/userAuth';

interface BaseQueryOptions {
    keepUnusedDataFor?: number;
    credentials?: 'include';
    prepareHeaders?: (headers: Headers) => Headers;
}

const url =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://design-generator.vercel.app';

const baseQuery = fetchBaseQuery({
    baseUrl: `${url}/api`,
    credentials: 'include', // Required to use cookies
    prepareHeaders: (headers) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const { accessToken } = getUserAuth();

        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }

        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api: BaseQueryApi, extraOptions: BaseQueryOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        // try to get a new token
        const res: any = await baseQuery(
            { url: 'auth/refresh-token', method: 'POST' },
            api,
            extraOptions,
        );

        const refreshResult = res.data;
        if (refreshResult) {
            // store the new token
            saveUserAuth(refreshResult.data);

            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
            const url = typeof args === 'string' ? args : args.url;
            if (url !== 'auth/login') {
                window.location.reload();
            }

            removeUserAuth();
        }
    }

    return result;
};
