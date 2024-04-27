import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import notify from '../utils/notify';

const Register = () => {
    const navigate = useNavigate();
    const [register] = useRegisterMutation();
    const [emailError, setEmailError] = useState('i');
    const [passwordError, setPasswordError] = useState('i');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const body = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        };

        try {
            const registerData: any = await register(body).unwrap();
            saveUserAuth({
                accessToken: registerData.accessToken,
                expiresAt: registerData.expiresAt,
                userId: registerData.userId,
            });
            navigate('/projects');
        } catch (e: any) {
            notify.error({ message: e.message });
            console.log('err', e);
        }
    };

    const checkPassword = (e: any) => {
        if (e.target.value.length < 6) {
            setPasswordError('Password too short');
        } else setPasswordError('');
    };

    const checkEmail = (e: any) => {
        if (
            !/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(
                (e.target.value as string) ?? '',
            )
        ) {
            setEmailError('Invalid email address');
            return;
        } else {
            setEmailError('');
        }
    };

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
                    onSubmit={handleSubmit}
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
                                onChange={checkEmail}
                                error={!!emailError && emailError !== 'i'}
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
                                error={!!passwordError && passwordError !== 'i'}
                                onChange={checkPassword}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        disabled={!!emailError || !!passwordError}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
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
