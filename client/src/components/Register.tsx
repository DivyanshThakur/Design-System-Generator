import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { saveUserAuth } from '../utils/userAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../redux/api/auth';
import LoadingButton from './LoadingButton';
import * as yup from 'yup';
import { useFormik } from 'formik';
import notify from '../utils/notify';

const validationSchema = yup.object({
    firstName: yup.string().trim().required('First Name is required'),
    lastName: yup.string().trim().required('Last Name is required'),
    email: yup.string().trim().email().required('Email is required'),
    password: yup
        .string()
        .trim()
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
});

const Register = () => {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const handleSubmit = async (formData: any) => {
        try {
            const registerData: any = await register(formData).unwrap();
            saveUserAuth({
                accessToken: registerData.accessToken,
                expiresAt: registerData.expiresAt,
                userId: registerData.userId,
            });
            navigate('/projects');
        } catch (e: any) {
            notify.error({ message: e.data.message });
            console.log('err', e);
        }
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
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
                    Register
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={formik.handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.firstName &&
                                    Boolean(formik.errors.firstName)
                                }
                                helperText={
                                    formik.touched.firstName &&
                                    formik.errors.firstName
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.lastName &&
                                    Boolean(formik.errors.lastName)
                                }
                                helperText={
                                    formik.touched.lastName &&
                                    formik.errors.lastName
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.password &&
                                    Boolean(formik.errors.password)
                                }
                                helperText={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        isLoading={isLoading}
                        sx={{ mt: 3, mb: 2 }}
                        style={{ margin: '1.5rem 0rem 1rem', height: '3.5rem' }}
                    >
                        Register
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                to="/auth/login"
                                style={{ textDecoration: 'none' }}
                            >
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
