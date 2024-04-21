import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserAuth } from '../utils/userAuth';

interface Props {
    children: ReactElement;
}

const PrivateRoute = ({ children }: Props) => {
    const { accessToken } = getUserAuth();
    if (!accessToken) return <Navigate to={'/auth/login'} replace />;
    return children;
};

export default PrivateRoute;
