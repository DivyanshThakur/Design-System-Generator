import { useUpdateThemeByProjectIdMutation } from '../redux/api/theme';
import { useSelector } from 'react-redux';
import { useUpdateComponentByProjectIdMutation } from '../redux/api/component';
import { ComponentInitialStateType } from '../redux/slices/component';
import { useState } from 'react';

interface OptionsType {
    isSaving: boolean;
    isSuccess: boolean;
    error: unknown;
}

const useAutoSave = (): [() => Promise<void>, OptionsType] => {
    const theme = useSelector((state: any) => state.theme);
    const component: ComponentInitialStateType = useSelector(
        (state: any) => state.component,
    );
    const projectData = useSelector((state: any) => state.selectedProject);

    const [updateTheme] = useUpdateThemeByProjectIdMutation();
    const [updateComponent] = useUpdateComponentByProjectIdMutation();
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    const save = async () => {
        // Resetting values for multiple save call
        setError(null);
        setIsSuccess(false);

        try {
            setIsSaving(true);
            await updateTheme({
                projectId: projectData._id,
                colors: theme.colors,
                radiusList: theme.radiusList,
                spacingList: theme.spacingList,
            });
            await updateComponent({
                projectId: projectData._id,
                componentId: component.selectedComponent._id,
                ...component.selectedComponent,
            });
            setIsSaving(false);
            setIsSuccess(true);
        } catch (err) {
            setError(err);
            setIsSuccess(false);
            setIsSaving(false);
        }
    };

    const options: OptionsType = { isSaving, isSuccess, error };
    return [save, options];
};

export default useAutoSave;
