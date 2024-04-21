import { useLocation, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetProjectByIdQuery } from '../redux/api/project';
import EditorContainer from './EditorContainer';
import { useEffect } from 'react';
import { setProjectData } from '../redux/slices/selectedProject';
import { useDispatch } from 'react-redux';

const DesignSystemPage = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const projectId = pathname.startsWith('/projects/')
        ? pathname.substring(10)
        : '';

    const { data, isLoading, isSuccess, isError }: any =
        useGetProjectByIdQuery(projectId);

    useEffect(() => {
        if (data) dispatch(setProjectData({ _id: data._id, name: data.name }));
    }, [data, dispatch]);

    if (!data && (isSuccess || isError)) {
        navigate('/projects');
        return <></>;
    }

    if (isLoading)
        return (
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );

    return <EditorContainer />;
};

export default DesignSystemPage;
