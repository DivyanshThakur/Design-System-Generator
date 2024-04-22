import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    name: '',
    selectedStyleTab: 'Color',
};

const selectedProjectSlice = createSlice({
    name: 'projectData',
    initialState,
    reducers: {
        setProjectData: (state, { payload }) => {
            if (payload._id) state._id = payload._id;
            if (payload.name) state.name = payload.name;
        },
        setSelectedStyleTab: (state, { payload }) => {            
            state.selectedStyleTab = payload;
        },
        resetProjectData: (state) => {
            state._id = '';
            state.name = '';
        },
    },
});

export const { setProjectData, setSelectedStyleTab, resetProjectData } =
    selectedProjectSlice.actions;
export default selectedProjectSlice.reducer;
