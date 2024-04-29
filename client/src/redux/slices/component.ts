import { createSlice } from '@reduxjs/toolkit';

export interface IComponent {
    _id: string;
    type: string;
    variantId: string;
    styles: {
        textColor: string;
        backgroundColor: string;
        borderColor: string;
        borderRadius: string;
        paddingX: string;
        paddingY: string;
    };
}
export interface ComponentInitialStateType {
    components: IComponent[];
    selectedComponent: IComponent;
}

const initialState: ComponentInitialStateType = {
    components: [],
    selectedComponent: {
        _id: '',
        type: 'button',
        variantId: '',
        styles: {
            textColor: 'Primary',
            backgroundColor: 'Primary',
            borderColor: 'Primary',
            borderRadius: 'xs',
            paddingX: 'xs',
            paddingY: 'xs',
        },
    },
};

const ComponentSlice = createSlice({
    name: 'component',
    initialState,
    reducers: {
        setSelectedComponent: (state, { payload }: { payload: IComponent }) => {
            if (state.selectedComponent._id !== '') {
                state.components = state.components.map((comp) => {
                    if (comp._id === state.selectedComponent._id)
                        return state.selectedComponent;
                    return comp;
                });
            }
            if (payload._id !== '') state.selectedComponent = payload;
        },

        setStyle: (
            state,
            { payload }: { payload: Partial<IComponent['styles']> },
        ) => {
            state.selectedComponent.styles.textColor =
                payload.textColor ?? state.selectedComponent.styles.textColor;
            state.selectedComponent.styles.backgroundColor =
                payload.backgroundColor ??
                state.selectedComponent.styles.backgroundColor;
            state.selectedComponent.styles.borderColor =
                payload.borderColor ??
                state.selectedComponent.styles.borderColor;
            state.selectedComponent.styles.borderRadius =
                payload.borderRadius ??
                state.selectedComponent.styles.borderRadius;
            state.selectedComponent.styles.paddingX =
                payload.paddingX ?? state.selectedComponent.styles.paddingX;
            state.selectedComponent.styles.paddingY =
                payload.paddingY ?? state.selectedComponent.styles.paddingY;
        },
        setSelectedComponentByType: (
            state,
            { payload }: { payload: string },
        ) => {
            if (!payload) return;
            if (state.selectedComponent._id !== '') {
                state.components = state.components.map((comp) => {
                    if (comp._id === state.selectedComponent._id)
                        return state.selectedComponent;
                    return comp;
                });
            }

            const newSelectedState = state.components.find((comp) =>
                comp.type === payload &&
                state.selectedComponent.variantId === comp.variantId
                    ? comp
                    : null,
            );

            if (newSelectedState) state.selectedComponent = newSelectedState;
        },
        setSelectedComponentByVariantId: (
            state,
            { payload }: { payload: string },
        ) => {
            if (state.selectedComponent._id !== '') {
                state.components = state.components.map((comp) => {
                    if (comp._id === state.selectedComponent._id)
                        return state.selectedComponent;
                    return comp;
                });
            }

            if (state.selectedComponent.variantId === payload) return;

            const newSelectedState = state.components.find((comp) =>
                comp.variantId === payload &&
                comp.type === state.selectedComponent.type
                    ? comp
                    : null,
            );

            if (newSelectedState) state.selectedComponent = newSelectedState;
        },
        setComponents: (state, { payload }: { payload: IComponent[] }) => {
            state.components = payload;
        },
        resetComponent: () => {
            return initialState;
        },
    },
});

export const {
    setComponents,
    setStyle,
    setSelectedComponentByType,
    setSelectedComponentByVariantId,
    setSelectedComponent,
    resetComponent,
} = ComponentSlice.actions;
export default ComponentSlice.reducer;
