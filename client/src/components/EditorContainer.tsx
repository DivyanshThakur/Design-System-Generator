'use client';
import React, { useEffect } from 'react';
import { Box, ButtonGroup, Button, Container } from '@mui/material';
import ColorThemeEditor from './ColorThemeEditor';
import RadiusThemeEditor from './RadiusThemeEditor';
import SpacingThemeEditor from './SpacingThemeEditor';
import StyledComponentContainer from './StyledComponentContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
    useGetThemeByProjectIdQuery,
    useUpdateThemeByProjectIdMutation,
} from '../redux/api/theme';
import { setTheme } from '../redux/slices/theme';
import { setSelectedStyleTab } from '../redux/slices/selectedProject';

interface TabPanelProps {
    children?: React.ReactNode;
    tabName: string;
    value: string;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, tabName, value, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={tabName !== value}
            id={`tabpanel-${tabName}`}
            {...other}
        >
            {tabName === value && children}
        </div>
    );
};

export default function EditorContainer() {
    const dispatch = useDispatch();
    const [updateTheme] = useUpdateThemeByProjectIdMutation();
    const projectData = useSelector((state: any) => state.selectedProject);

    const { data } = useGetThemeByProjectIdQuery(projectData._id, {
        skip: projectData._id.length === 0,
    });

    const theme = useSelector((state: any) => state.theme);

    useEffect(() => {
        const updatedTheme: any = {};

        if (data?.colors) updatedTheme.colors = data.colors;
        if (data?.radiusList) updatedTheme.radiusList = data.radiusList;
        if (data?.spacingList) updatedTheme.spacingList = data.spacingList;
        dispatch(setTheme(updatedTheme));
    }, [data, dispatch]);

    const options = [
        {
            name: 'Color',
            component: <ColorThemeEditor />,
        },
        {
            name: 'Radius',
            component: <RadiusThemeEditor />,
        },
        {
            name: 'Spacing',
            component: <SpacingThemeEditor />,
        },
        {
            name: 'Component',
            component: <StyledComponentContainer />,
        },
    ];

    const handleChange = async (tab: string) => {
        await updateTheme({
            projectId: projectData._id,
            colors: theme.colors,
            radiusList: theme.radiusList,
            spacingList: theme.spacingList,
        });
        dispatch(setSelectedStyleTab(tab));
    };

    return (
        <Container
            component="main"
            style={{ paddingTop: 40, paddingBottom: 20 }}
        >
            <Box display="flex" justifyContent="center">
                <ButtonGroup>
                    {options.map(({ name }) => (
                        <Button
                            key={`btn-${name}`}
                            variant={
                                projectData.selectedStyleTab === name
                                    ? 'contained'
                                    : 'outlined'
                            }
                            onClick={() => handleChange(name)}
                        >
                            {name}
                        </Button>
                    ))}
                </ButtonGroup>
            </Box>
            {options.map(({ name, component }) => (
                <CustomTabPanel
                    key={`tabPanel-${name}`}
                    tabName={name}
                    value={projectData.selectedStyleTab}
                >
                    {component}
                </CustomTabPanel>
            ))}
        </Container>
    );
}
