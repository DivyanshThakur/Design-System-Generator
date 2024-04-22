import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../components/InputList';

interface InitialStateType {
    colors: Item[];
}

const initialState: InitialStateType = {
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
