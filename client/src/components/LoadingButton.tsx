import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactNode } from 'react';

interface Props extends ButtonProps {
    isLoading?: boolean;
    children: ReactNode;
}

const LoadingButton = ({ isLoading, children, ...props }: Props) => {
    return (
        <Button disableFocusRipple {...props}>
            {isLoading ? (
                <CircularProgress style={{ color: 'white' }} />
            ) : (
                children
            )}
        </Button>
    );
};

export default LoadingButton;
