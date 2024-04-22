import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CSSProperties } from 'react';
import { useGetAllProjectsQuery } from '../redux/api/project';
import { useDispatch } from 'react-redux';
import { setSelectedComponentByType } from '../redux/slices/component';

interface ProjectDropdownProps {
    value: string;
    label?: string;
    variant?: 'standard' | 'filled' | 'outlined';
    onChange?: (val: string) => void;
    showCreateNewProject?: boolean;
    minWidth?: number;
    style?: CSSProperties;
}

const ProjectDropdown = (props: ProjectDropdownProps) => {
    const {
        value,
        onChange,
        label = '',
        variant = 'standard',
        showCreateNewProject = true,
        style,
        minWidth = 100,
        ...rest
    } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useGetAllProjectsQuery();

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.value;
        onChange?.(name);
    };

    const handleNaviagtion = (id: string) => {
        navigate(`/projects/${id}`);
        dispatch(setSelectedComponentByType('button'));
    };

    return (
        <FormControl>
            {!!label && label.length > 0 && (
                <InputLabel id="project-label-id">{label}</InputLabel>
            )}
            <Select
                style={{
                    background: 'white',
                    minWidth: minWidth ?? 100,
                    paddingLeft: 10,
                    ...style,
                }}
                variant={variant}
                labelId="project-label-id"
                id="select"
                value={data?.length > 0 ? value : ''}
                label="Projects"
                fullWidth
                onChange={handleChange}
                {...rest}
            >
                {data?.map((project: any) => (
                    <MenuItem
                        key={project._id}
                        value={project._id}
                        onClick={() => handleNaviagtion(project._id)}
                    >
                        {project.name}
                    </MenuItem>
                ))}
                {showCreateNewProject && (
                    <MenuItem
                        value={'Create new project'}
                        onClick={() => navigate('/projects')}
                    >
                        Create New Project
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
};

export default ProjectDropdown;
