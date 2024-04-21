import { rootApi } from ".";

export const authApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => response.data,
    }),
    register: build.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => response.data,
    }),
    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    resetPassword: build.mutation({
      query: (data) => {
        const { resetToken, ...body } = data;

        return {
          url: `auth/reset-password/${resetToken}`,
          method: "PUT",
          body,
        };
      },
      transformResponse: (response: any) => response.data,
    }),
    refreshToken: build.mutation({
      query: () => ({
        url: "auth/refresh-token",
        method: "POST",
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
} = authApi;
