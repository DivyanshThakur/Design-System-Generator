import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, IconButton, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    useGetThemeByProjectIdQuery,
    useUpdateThemeByProjectIdMutation,
} from '../redux/api/theme';
import { setTheme } from '../redux/slices/theme';

export interface Variant {
    _id: string;
    name: string;
}

const VariantThemeEditor = () => {
    const dispatch = useDispatch();
    const [updateTheme] = useUpdateThemeByProjectIdMutation();
    const projectData = useSelector((state: any) => state.selectedProject);
    const variants: Variant[] = useSelector(
        (state: any) => state.theme.variants,
    );

    const { data } = useGetThemeByProjectIdQuery(projectData._id, {
        skip: projectData._id.length === 0,
    });

    const handleChange = (item: Variant) => {
        const updatedVariantList = variants.map((variant: Variant) => {
            if (item._id === variant._id) {
                return item;
            }
            return variant;
        });
        dispatch(setTheme({ variants: updatedVariantList }));
    };

    useEffect(() => {
        const updatedTheme: any = {};

        if (data?.variants) updatedTheme.variants = data.variants;
        if (data?.radiusList) updatedTheme.radiusList = data.radiusList;
        if (data?.spacingList) updatedTheme.spacingList = data.spacingList;
        if (data?.variants) updatedTheme.variants = data.variants;

        dispatch(setTheme(updatedTheme));
    }, [data, dispatch]);

    const handleDelete = async (item: Variant) => {
        await updateTheme({
            projectId: projectData._id,
            variants: variants.filter(
                (variant: Variant, index: number) =>
                    index === 0 || item._id !== variant._id,
            ),
            deletedVariants: [item._id],
        });
    };

    const handleAddVariant = async () => {
        const variant: any = {
            name: `Variant ${variants.length + 1}`,
        };
        await updateTheme({
            projectId: projectData._id,
            variants: [...variants, variant],
            addedVariants: [variant.name],
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
                {variants.map((variant: Variant, index) => (
                    <Box
                        key={variant._id}
                        display="flex"
                        alignItems="center"
                        gap={4}
                    >
                        <TextField
                            margin="normal"
                            label="Variant Name"
                            name="variantName"
                            value={variant.name}
                            onChange={(e) =>
                                handleChange({
                                    _id: variant._id,
                                    name: e.target.value,
                                })
                            }
                        />
                        {index > 0 && (
                            <IconButton
                                aria-label="delete-variant"
                                color="primary"
                                onClick={() => handleDelete(variant)}
                                style={{ height: 50, width: 50 }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}
                <IconButton
                    aria-label="add-variant"
                    color="primary"
                    onClick={handleAddVariant}
                    size="large"
                >
                    <AddCircleIcon />
                </IconButton>
            </Box>
        </Container>
    );
};

export default VariantThemeEditor;
