import { useDispatch, useSelector } from 'react-redux';
import { Container, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputList, { Item } from './InputList';
import {
    useGetThemeByProjectIdQuery,
    useUpdateThemeByProjectIdMutation,
} from '../redux/api/theme';
import { useEffect } from 'react';
import { setTheme } from '../redux/slices/theme';

const ColorThemeEditor = () => {
    const dispatch = useDispatch();
    const [updateTheme] = useUpdateThemeByProjectIdMutation();
    const projectData = useSelector((state: any) => state.selectedProject);
    const colors: Item[] = useSelector((state: any) => state.theme.colors);

    const { data } = useGetThemeByProjectIdQuery(projectData._id, {
        skip: projectData._id.length === 0,
    });

    const handleChange = (item: Item) => {
        const updatedColorList = colors.map((color: Item) => {
            if (color._id === item._id) {
                return item;
            }
            return color;
        });
        dispatch(setTheme({ colors: updatedColorList }));
    };

    useEffect(() => {
        if (data?.colors) dispatch(setTheme({ colors: data.colors }));
    }, [data, dispatch]);

    const handleDelete = async (item: Item) => {
        await updateTheme({
            projectId: projectData._id,
            colors: colors.filter(
                (color: Item, index: number) =>
                    index <= 1 || color._id !== item._id,
            ),
        });
    };

    const handleAddColor = async () => {
        const item: any = {
            name: `Color ${colors.length + 1}`,
            value: '',
        };
        await updateTheme({
            projectId: projectData._id,
            colors: [...colors, item],
        });
    };

    return (
        <Container style={{ padding: 40 }}>
            <IconButton
                aria-label="add-color"
                color="primary"
                onClick={handleAddColor}
                size="large"
            >
                <AddCircleIcon />
            </IconButton>
            <InputList
                variableNameLabel="Variable Name"
                variableValueLabel="Color Name"
                items={colors}
                fixedItemCount={2}
                onChange={handleChange}
                onDelete={handleDelete}
            />
        </Container>
    );
};

export default ColorThemeEditor;
