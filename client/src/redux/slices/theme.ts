import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    colors: [],
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, { payload }) => {
            if (payload.colors) state.colors = payload.colors;
        },
        resetTheme: (state) => {
            state.colors = [];
        },
    },
});

export const { setTheme, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
