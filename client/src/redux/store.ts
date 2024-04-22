import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import selectedProjectReducer from './slices/selectedProject';
import themeReducer from './slices/theme';
import { rootApi } from './api';

const store = configureStore({
    reducer: {
        [rootApi.reducerPath]: rootApi.reducer,
        selectedProject: selectedProjectReducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rootApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;
