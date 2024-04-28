import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputList, { Item } from './InputList';
import {
    useGetThemeByProjectIdQuery,
    useUpdateThemeByProjectIdMutation,
} from '../redux/api/theme';
import { setTheme } from '../redux/slices/theme';

const RadiusThemeEditor = () => {
    const dispatch = useDispatch();
    const [updateTheme] = useUpdateThemeByProjectIdMutation();
    const projectData = useSelector((state: any) => state.selectedProject);
    const radiusList: Item[] = useSelector(
        (state: any) => state.theme.radiusList,
    );
    const { data } = useGetThemeByProjectIdQuery(projectData._id, {
        skip: projectData._id.length === 0,
    });

    useEffect(() => {
        const updatedTheme: any = {};

        if (data?.colors) updatedTheme.colors = data.colors;
        if (data?.radiusList) updatedTheme.radiusList = data.radiusList;
        if (data?.spacingList) updatedTheme.spacingList = data.spacingList;
        if (data?.variants) updatedTheme.variants = data.variants;

        dispatch(setTheme(updatedTheme));
    }, [data, dispatch]);

    const handleChange = (item: Item) => {
        const updatedRadiusList = radiusList.map((radius: Item) => {
            if (radius._id === item._id) {
                return item;
            }
            return radius;
        });
        dispatch(setTheme({ radiusList: updatedRadiusList }));
    };

    const handleDelete = async (item: Item) => {
        await updateTheme({
            projectId: projectData._id,
            radiusList: radiusList.filter(
                (radius: Item, index: number) =>
                    index <= 1 || radius._id !== item._id,
            ),
        });
    };

    const roundToEven = (num: number) => {
        if (num % 2 === 0) return num;
        return num + 1;
    };

    const handleAddRadius = async () => {
        const item: any = {
            name: `${radiusList.length - 6}xl`,
            value: `${roundToEven(
                Math.round(+radiusList[radiusList.length - 1].value * 1.5),
            )}`,
        };
        await updateTheme({
            projectId: projectData._id,
            radiusList: [...radiusList, item],
        });
    };

    return (
        <Container
            style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: 20,
                paddingBottom: 20,
            }}
        >
            <Box>
                <InputList
                    variableNameLabel="Variable Name"
                    variableValueLabel="Size (Px)"
                    items={radiusList}
                    fixedItemCount={7}
                    onChange={handleChange}
                    onDelete={handleDelete}
                />
                <IconButton
                    aria-label="add-radius"
                    color="primary"
                    onClick={handleAddRadius}
                    size="large"
                >
                    <AddCircleIcon />
                </IconButton>
            </Box>
        </Container>
    );
};

export default RadiusThemeEditor;
