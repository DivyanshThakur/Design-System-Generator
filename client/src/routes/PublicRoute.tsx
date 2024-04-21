import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserAuth } from '../utils/userAuth';

interface Props {
    children: ReactElement;
}

const PublicRoute = ({ children }: Props) => {
    const { accessToken } = getUserAuth();
    if (accessToken) {
        return <Navigate to={'/projects'} replace />;
    }
    return children;
};

export default PublicRoute;
