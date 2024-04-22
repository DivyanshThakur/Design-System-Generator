'use client';
import React from 'react';
import { Box, ButtonGroup, Button, Container } from '@mui/material';
import ColorThemeEditor from './ColorThemeEditor';
import RadiusThemeEditor from './RadiusThemeEditor';
import SpacingThemeEditor from './SpacingThemeEditor';
import StyledComponentContainer from './StyledComponentContainer';
import { useSelector } from 'react-redux';
import { useUpdateThemeByProjectIdMutation } from '../redux/api/theme';

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
    const [updateTheme] = useUpdateThemeByProjectIdMutation();
    const projectData = useSelector((state: any) => state.selectedProject);

    const theme = useSelector((state: any) => state.theme);

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

    const [selectedTab, setSelectedTab] = React.useState(options[0].name);

    const handleChange = async (tab: string) => {
        await updateTheme({
            projectId: projectData._id,
            colors: theme.colors,
            radiusList: theme.radiusList,
            spacingList: theme.spacingList,
        });
        setSelectedTab(tab);
    };

    return (
        <Container
            component="main"
            style={{ paddingTop: 40, paddingBottom: 20 }}
        >
            <Box display='flex' justifyContent='center'>
                <ButtonGroup>
                    {options.map(({ name }) => (
                        <Button
                            key={`btn-${name}`}
                            variant={
                                selectedTab === name ? 'contained' : 'outlined'
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
                    value={selectedTab}
                >
                    {component}
                </CustomTabPanel>
            ))}
        </Container>
    );
}
