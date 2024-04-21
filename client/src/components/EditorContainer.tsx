'use client';
import React from 'react';
import { Box, ButtonGroup, Button, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import ColorThemeEditor from './ColorThemeEditor';
import RadiusThemeEditor from './RadiusThemeEditor';
import SpacingThemeEditor from './SpacingThemeEditor';
import StyledComponentViewer from './StyledComponentViewer';

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
    const projectData = useSelector((state: any) => state.selectedProject);
    console.log('pd', projectData);

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
            component: <StyledComponentViewer />
        }
    ];

    const [selectedTab, setSelectedTab] = React.useState(options[0].name);

    const handleChange = (tab: string) => {
        setSelectedTab(tab);
    };

    return (
        <Container component="main" style={{ padding: 40 }}>
            <Box>
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
