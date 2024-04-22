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

const SpacingThemeEditor = () => {
    const dispatch = useDispatch();
    const [updateTheme] = useUpdateThemeByProjectIdMutation();
    const projectData = useSelector((state: any) => state.selectedProject);
    const spacingList: Item[] = useSelector(
        (state: any) => state.theme.spacingList,
    );

    const { data } = useGetThemeByProjectIdQuery(projectData._id, {
        skip: projectData._id.length === 0,
    });

    useEffect(() => {
        if (data?.colors) dispatch(setTheme({ colors: data.colors }));
        if (data?.radiusList)
            dispatch(setTheme({ radiusList: data.radiusList }));
        if (data?.spacingList)
            dispatch(setTheme({ spacingList: data.spacingList }));
    }, [data, dispatch]);

    const handleChange = (item: Item) => {
        const updatedSpacingList = spacingList.map((spacing: Item) => {
            if (spacing._id === item._id) {
                return item;
            }
            return spacing;
        });
        dispatch(setTheme({ spacingList: updatedSpacingList }));
    };

    const handleDelete = async (item: Item) => {
        await updateTheme({
            projectId: projectData._id,
            spacingList: spacingList.filter(
                (spacing: Item, index: number) =>
                    index <= 1 || spacing._id !== item._id,
            ),
        });
    };

    const roundToEven = (num: number) => {
        if (num % 2 === 0) return num;
        return num + 1;
    };

    const handleAddSpacing = async () => {
        const item: any = {
            name: `${spacingList.length - 6}xl`,
            value: `${roundToEven(
                Math.round(+spacingList[spacingList.length - 1].value * 1.5),
            )}`,
        };
        await updateTheme({
            projectId: projectData._id,
            spacingList: [...spacingList, item],
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
                    items={spacingList}
                    fixedItemCount={7}
                    onChange={handleChange}
                    onDelete={handleDelete}
                />
                <IconButton
                    aria-label="add-spacing"
                    color="primary"
                    onClick={handleAddSpacing}
                    size="large"
                >
                    <AddCircleIcon />
                </IconButton>
            </Box>
        </Container>
    );
};

export default SpacingThemeEditor;
