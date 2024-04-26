import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import selectedProjectReducer from './slices/selectedProject';
import themeReducer from './slices/theme';
import { rootApi } from './api';
import componentReducer from './slices/component';

const rootReducer = combineReducers({
    [rootApi.reducerPath]: rootApi.reducer,
    selectedProject: selectedProjectReducer,
    theme: themeReducer,
    component: componentReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rootApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;

export const persistor = persistStore(store);
