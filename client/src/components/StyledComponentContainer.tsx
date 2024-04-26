import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Grid,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from './InputList';
import StyledComponentViewer from './StyledComponentViewer';
import {
    ComponentInitialStateType,
    setComponents,
    setSelectedComponentByType,
    setStyle,
} from '../redux/slices/component';
import {
    useGetAllComponentsQuery,
    useUpdateComponentByProjectIdMutation,
} from '../redux/api/component';

const StyledComponentContainer = () => {
    const dispatch = useDispatch();
    const projectData = useSelector((state: any) => state.selectedProject);
    const [updateComponent] = useUpdateComponentByProjectIdMutation();

    const { data } = useGetAllComponentsQuery(projectData._id, {
        skip: projectData._id.length === 0,
    });

    const theme = useSelector((state: any) => state.theme);
    const { selectedComponent }: ComponentInitialStateType = useSelector(
        (state: any) => state.component,
    );

    const componentsTypes = [
        'button',
        'input-text',
        'radio',
        'checkbox',
        'select',
    ];

    useEffect(() => {
        if (data) {
            dispatch(setComponents(data));
            dispatch(
                setSelectedComponentByType(
                    selectedComponent._id === ''
                        ? 'button'
                        : selectedComponent.type,
                ),
            );
        }
    }, [data, dispatch, selectedComponent]);

    const handleTypeButtonClick = async (type: string) => {
        await updateComponent({
            projectId: projectData._id,
            componentId: selectedComponent._id,
            ...selectedComponent,
        });
        dispatch(setSelectedComponentByType(type));
    };

    const handleChange = (e: any) => {
        dispatch(setStyle({ [e.target.name]: e.target.value }));
    };

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: 20,
                paddingBottom: 20,
            }}
        >
            <ButtonGroup style={{ alignSelf: 'center', marginBottom: 40 }}>
                {componentsTypes.map((type) => (
                    <Button
                        key={`btn-${type}`}
                        variant={
                            selectedComponent.type === type
                                ? 'contained'
                                : 'outlined'
                        }
                        onClick={() => handleTypeButtonClick(type)}
                    >
                        {type}
                    </Button>
                ))}
            </ButtonGroup>
            <Grid container display="flex" justifyContent="center" gap={2}>
                <Grid item sm={5}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        border="1px solid black"
                        borderRadius={4}
                        padding={2}
                        gap={2}
                    >
                        <Box>
                            <Typography
                                component="div"
                                display="inline-block"
                                width={150}
                            >
                                Text Color:
                            </Typography>
                            {
                                <Select
                                    style={{
                                        paddingLeft: 10,
                                        marginLeft: 20,
                                        minWidth: 150,
                                    }}
                                    variant="filled"
                                    id="select-color"
                                    value={selectedComponent.styles.textColor}
                                    label="Text Color"
                                    name="textColor"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {theme.colors?.map((color: Item) => (
                                        <MenuItem
                                            key={color.name}
                                            value={color.name}
                                        >
                                            {color.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            }
                        </Box>
                        <Box>
                            <Typography
                                component="div"
                                display="inline-block"
                                width={150}
                            >
                                Background Color:
                            </Typography>
                            {
                                <Select
                                    style={{
                                        paddingLeft: 10,
                                        marginLeft: 20,
                                        minWidth: 150,
                                    }}
                                    variant="filled"
                                    id="select-background-color"
                                    value={
                                        selectedComponent.styles.backgroundColor
                                    }
                                    label="Background Color"
                                    name="backgroundColor"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {theme.colors?.map((color: Item) => (
                                        <MenuItem
                                            key={color.name}
                                            value={color.name}
                                        >
                                            {color.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            }
                        </Box>
                        <Box>
                            <Typography
                                component="div"
                                display="inline-block"
                                width={150}
                            >
                                Border Color:
                            </Typography>
                            {
                                <Select
                                    style={{
                                        paddingLeft: 10,
                                        marginLeft: 20,
                                        minWidth: 150,
                                    }}
                                    variant="filled"
                                    id="select-border-color"
                                    value={selectedComponent.styles.borderColor}
                                    label="Border Color"
                                    name="borderColor"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {theme.colors?.map((color: Item) => (
                                        <MenuItem
                                            key={color.name}
                                            value={color.name}
                                        >
                                            {color.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            }
                        </Box>
                        <Box>
                            <Typography
                                component="div"
                                display="inline-block"
                                width={150}
                            >
                                Border Radius:
                            </Typography>
                            {
                                <Select
                                    style={{
                                        paddingLeft: 10,
                                        marginLeft: 20,
                                        minWidth: 150,
                                    }}
                                    variant="filled"
                                    id="select-border-radius"
                                    value={
                                        selectedComponent.styles.borderRadius
                                    }
                                    label="Border Radius"
                                    name="borderRadius"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {theme.radiusList?.map((radius: Item) => (
                                        <MenuItem
                                            key={radius.name}
                                            value={radius.name}
                                        >
                                            {radius.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            }
                        </Box>
                        <Box>
                            <Typography
                                component="div"
                                display="inline-block"
                                width={150}
                            >
                                Padding X:
                            </Typography>
                            {
                                <Select
                                    style={{
                                        paddingLeft: 10,
                                        marginLeft: 20,
                                        minWidth: 150,
                                    }}
                                    variant="filled"
                                    id="select-border-paddingX"
                                    value={selectedComponent.styles.paddingX}
                                    label="Border Padding X"
                                    name="paddingX"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {theme.spacingList?.map((spacing: Item) => (
                                        <MenuItem
                                            key={spacing.name}
                                            value={spacing.name}
                                        >
                                            {spacing.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            }
                        </Box>
                        <Box>
                            <Typography
                                component="div"
                                display="inline-block"
                                width={150}
                            >
                                Padding Y:
                            </Typography>
                            {
                                <Select
                                    style={{
                                        paddingLeft: 10,
                                        marginLeft: 20,
                                        minWidth: 150,
                                    }}
                                    variant="filled"
                                    id="select-border-paddingY"
                                    value={selectedComponent.styles.paddingY}
                                    label="Border Padding Y"
                                    name="paddingY"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {theme.spacingList?.map((spacing: Item) => (
                                        <MenuItem
                                            key={spacing.name}
                                            value={spacing.name}
                                        >
                                            {spacing.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            }
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <StyledComponentViewer />
                </Grid>
            </Grid>
        </Container>
    );
};

export default StyledComponentContainer;
