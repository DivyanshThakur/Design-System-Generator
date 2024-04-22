import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { ComponentInitialStateType } from '../redux/slices/component';
import { CSSProperties, useState } from 'react';
import { Item } from './InputList';

interface StyledComponentProps {
    type: string;
    textColor: string;
    backgroundColor: string;
    borderColor: string;
    borderRadius: string;
    paddingX: string;
    paddingY: string;
}

const StyledComponent = (props: StyledComponentProps) => {
    const theme: any = useSelector((state: any) => state.theme);
    const [selectValue, setSelectValue] = useState('option-1');
    const [inputValue, setInputValue] = useState('Divyansh Thakur');

    const getValueFromStyleName = (
        type: 'color' | 'radius' | 'spacing',
        styleName: string,
    ) => {
        switch (type) {
            case 'color':
                return theme.colors?.find(
                    (color: Item) => color.name === styleName,
                )?.value;
            case 'radius':
                const radiusSize = theme.radiusList?.find(
                    (radius: Item) => radius.name === styleName,
                )?.value;
                return radiusSize ? radiusSize + 'px' : '0px';
            case 'spacing':
                const spacingSize = theme.spacingList?.find(
                    (spacing: Item) => spacing.name === styleName,
                )?.value;
                return spacingSize ? spacingSize + 'px' : '0px';
            default:
        }
        return '';
    };

    const commonCustomStyles: CSSProperties = {
        border: '1px solid black',
        color: getValueFromStyleName('color', props.textColor),
        backgroundColor: getValueFromStyleName('color', props.backgroundColor),
        borderColor: getValueFromStyleName('color', props.borderColor),
        borderRadius: getValueFromStyleName('radius', props.borderRadius),
        paddingTop: getValueFromStyleName('spacing', props.paddingY),
        paddingBottom: getValueFromStyleName('spacing', props.paddingY),
        paddingLeft: getValueFromStyleName('spacing', props.paddingX),
        paddingRight: getValueFromStyleName('spacing', props.paddingX),
    };

    switch (props.type) {
        case 'button':
            return (
                <Button
                    variant="contained"
                    size="large"
                    style={{
                        cursor: 'pointer',
                        ...commonCustomStyles,
                    }}
                >
                    Continue
                </Button>
            );
        case 'input-text':
            return (
                <TextField
                    className="input-custom"
                    placeholder="Text Input Field"
                    value={inputValue}
                    onChange={(e: any) => setInputValue(e.target.value)}
                    inputProps={{
                        style: commonCustomStyles,
                    }}
                />
            );
        case 'radio':
            return (
                <RadioGroup
                    defaultValue="Default"
                    name="radio-buttons-group"
                    style={{ display: 'flex', flexDirection: 'row', gap: 8 }}
                >
                    <FormControlLabel
                        value="Default"
                        control={<Radio />}
                        label="Default"
                        style={commonCustomStyles}
                    />
                    <FormControlLabel
                        value="Other Value"
                        control={<Radio />}
                        label="Other Value"
                        style={commonCustomStyles}
                    />
                </RadioGroup>
            );
        case 'checkbox':
            return (
                <Box display="flex" gap={2}>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Do you liked it?"
                        style={commonCustomStyles}
                    />
                    <FormControlLabel
                        style={commonCustomStyles}
                        control={<Checkbox />}
                        label="Subscribe me"
                    />
                </Box>
            );
        case 'select':
            return (
                <Select
                    variant="standard"
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                    label="Select"
                    style={{
                        minWidth: 100,
                        ...commonCustomStyles,
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="option-1">Option 1</MenuItem>
                    <MenuItem value="option-2">Option 2</MenuItem>
                    <MenuItem value="option-3">Option 3</MenuItem>
                </Select>
            );
        default:
    }
    return <></>;
};

const StyledComponentViewer = () => {
    const { selectedComponent }: ComponentInitialStateType = useSelector(
        (state: any) => state.component,
    );

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="1px solid black"
            borderRadius={4}
            padding={2}
            height="100%"
        >
            <StyledComponent
                type={selectedComponent.type}
                textColor={selectedComponent.styles.textColor}
                backgroundColor={selectedComponent.styles.backgroundColor}
                borderColor={selectedComponent.styles.borderColor}
                borderRadius={selectedComponent.styles.borderRadius}
                paddingX={selectedComponent.styles.paddingX}
                paddingY={selectedComponent.styles.paddingY}
            />
        </Box>
    );
};

export default StyledComponentViewer;
