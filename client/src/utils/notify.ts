import { toast, ToastOptions } from 'react-toastify'; // Import ToastOptions type

interface ToastProps {
    toastId?: string;
    message: string;
    autoClose?: number;
}

const notify = {
    success: (props: ToastProps) => {
        const options: ToastOptions = {
            toastId: props.toastId,
            autoClose: props.autoClose || 5000,
            theme: 'colored', // Assuming the theme exists in your setup
        };
        toast.success(props.message, options);
    },
    error: (props: ToastProps) => {
        const options: ToastOptions = {
            toastId: props.toastId,
            autoClose: props.autoClose || 5000,
            theme: 'colored', // Assuming the theme exists in your setup
        };
        toast.error(props.message, options);
    },
};

export default notify;
