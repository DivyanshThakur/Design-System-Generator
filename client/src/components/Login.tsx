import React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, Link } from 'react-router-dom';
import { saveUserAuth } from '../utils/userAuth';
import { useLoginMutation } from '../redux/api/auth';
import LoadingButton from './LoadingButton';
import * as yup from 'yup';
import notify from '../utils/notify';
import { useFormik } from 'formik';

const validationSchema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (formData: any) => {
        try {
            const loginData: any = await login(formData).unwrap();
            saveUserAuth({
                accessToken: loginData.accessToken,
                expiresAt: loginData.expiresAt,
                userId: loginData.userId,
            });
            navigate('/projects');
        } catch (e: any) {
            notify.error({ message: e.data.message });
            console.log('err', e);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                    />
                    <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        isLoading={isLoading}
                        sx={{ mt: 3, mb: 2 }}
                        style={{ margin: '1.5rem 0rem 1rem', height: '3.5rem' }}
                    >
                        Log In
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                to="/auth/register"
                                style={{ textDecoration: 'none' }}
                            >
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
