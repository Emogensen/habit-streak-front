import styled from '@emotion/styled';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { ErrorResponse, NewUser, register } from '../../slices/authSlice';
import { NotificationType, showNotification } from '../../slices/notificationSlice';

const Register = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<NewUser>({ name: '', email: '', password: '' });

  const validateForm = (): boolean => {
    const tempErrors: NewUser = { name: '', email: '', password: '' };
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      tempErrors.name = 'Name is required';
    }
    if (!email) {
      formIsValid = false;
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      tempErrors.email = 'Email is not valid';
    }
    if (!password) {
      formIsValid = false;
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      formIsValid = false;
      tempErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(tempErrors);

    return formIsValid;
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement> | Event) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await dispatch(register({ name, email, password })).unwrap();
      } catch (rejectedValue) {
        const { message, code } = rejectedValue as ErrorResponse;
        dispatch(
          showNotification({
            message: message,
            type: NotificationType.Error
          })
        );

        if (code === 409) {
          setErrors({ ...errors, email: message });
        }
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Register</Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <CenteredContainer>
                <p>Already have an account?</p>
                <Link to="/login">Login</Link>
              </CenteredContainer>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;

const CenteredContainer = styled.div`
  width: fit-content;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;
