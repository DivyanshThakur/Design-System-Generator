import { Box, Button, Container, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import ProjectDropdown from './ProjectDropdown';
import { useCreateProjectMutation } from '../redux/api/project';
import notify from '../utils/notify';
import { useNavigate } from 'react-router-dom';

const ProjectListPage = () => {
    const navigate = useNavigate();
    const [createProject] = useCreateProjectMutation();

    const [projectName, setProjectName] = useState<string>('');
    const [existingProjectName, setExistingProjectName] = useState<string>('');

    const handleCreateNewProject = async () => {
        try {
            const projectData = await createProject({ projectName }).unwrap();
            navigate(`/projects/${projectData._id}`);
        } catch (e: any) {
            notify.error({ message: e.message });
        }
    };

    return (
        <Container component="main" style={{ padding: 40 }}>
            <Paper style={{ padding: 40 }}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={4}
                    marginBottom={4}
                >
                    <TextField
                        margin="normal"
                        name="projectName"
                        label="Project Name"
                        type="text"
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={handleCreateNewProject}
                    >
                        Create New Project
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <ProjectDropdown
                        variant="filled"
                        showCreateNewProject={false}
                        label="Select Existing Project"
                        minWidth={360}
                        value={existingProjectName}
                        onChange={(val: string) => setExistingProjectName(val)}
                    />
                </Box>
            </Paper>
        </Container>
    );
};

export default ProjectListPage;
