import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../components/InputList';
import { Variant } from '../../components/VariantThemeEditor';

interface InitialStateType {
    colors: Item[];
    radiusList: Item[];
    spacingList: Item[];
    variants: Variant[];
}

const initialState: InitialStateType = {
    colors: [],
    radiusList: [],
    spacingList: [],
    variants: [],
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, { payload }) => {
            if (payload.colors) state.colors = payload.colors;
            if (payload.radiusList) state.radiusList = payload.radiusList;
            if (payload.spacingList) state.spacingList = payload.spacingList;
            if (payload.variants) state.variants = payload.variants;
        },
        resetTheme: (state) => {
            state.colors = [];
            state.radiusList = [];
            state.spacingList = [];
            state.variants = [];
        },
    },
});

export const { setTheme, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
