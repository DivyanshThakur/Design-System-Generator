import { Box, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Item {
    _id: string;
    name: string;
    value: string;
}

interface Props {
    variableNameLabel: string;
    variableValueLabel: string;
    items: Item[];
    fixedItemCount: number;
    onChange: (item: Item) => void;
    onDelete: (item: Item) => void;
}

const InputList = ({
    items,
    fixedItemCount,
    onChange,
    onDelete,
    variableNameLabel,
    variableValueLabel,
}: Props) => {
    return (
        <Box>
            {items?.map((item, index) => (
                <Box
                    key={item._id}
                    display="flex"
                    alignItems="center"
                    gap={4}
                >
                    <TextField
                        margin="normal"
                        label={variableNameLabel}
                        name={`name-${index + 1}`}
                        value={item.name}
                        onChange={(e) =>
                            onChange({
                                _id: item._id,
                                name: e.target.value,
                                value: item.value,
                            })
                        }
                    />
                    <TextField
                        margin="normal"
                        label={variableValueLabel}
                        name={`value-${index + 1}`}
                        value={item.value}
                        onChange={(e) =>
                            onChange({
                                _id: item._id,
                                name: item.name,
                                value: e.target.value,
                            })
                        }
                    />
                    {index + 1 > fixedItemCount && (
                        <IconButton
                            aria-label="delete-color"
                            color="primary"
                            onClick={() => onDelete(item)}
                            style={{ height: 50, width: 50 }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default InputList;
