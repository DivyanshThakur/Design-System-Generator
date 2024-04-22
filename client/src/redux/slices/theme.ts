import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../components/InputList';

interface InitialStateType {
    colors: Item[];
    radiusList: Item[];
    spacingList: Item[];
}

const initialState: InitialStateType = {
    colors: [],
    radiusList: [],
    spacingList: [],
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, { payload }) => {
            if (payload.colors) state.colors = payload.colors;
            if (payload.radiusList) state.radiusList = payload.radiusList;
            if (payload.spacingList) state.spacingList = payload.spacingList;
        },
        resetTheme: (state) => {
            state.colors = [];
            state.radiusList = [];
            state.spacingList = [];
        },
    },
});

export const { setTheme, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
