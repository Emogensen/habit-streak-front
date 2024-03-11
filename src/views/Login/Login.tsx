import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';
import { LockOutlined } from '@mui/icons-material';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { ErrorResponse, User, login } from '../../slices/authSlice';
import { NotificationType, showNotification } from '../../slices/notificationSlice';

const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<User>({ email: '', password: '' });

  const validateEmail = (email: string): boolean => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validateForm = (): boolean => {
    const tempErrors: User = { email: '', password: '' };
    let formIsValid = true;

    if (!email || !validateEmail(email)) {
      formIsValid = false;
      tempErrors.email = 'Please enter a valid email address';
    }
    setErrors(tempErrors);

    return formIsValid;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement> | Event) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await dispatch(login({ email, password })).unwrap();
      } catch (rejectedValue) {
        const { message } = rejectedValue as ErrorResponse;
        dispatch(
          showNotification({
            message: message,
            type: NotificationType.Error
          })
        );
      }
    }
  };

  return (
    <Container>
      <CssBaseline />
      <Box sx={{ mt: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Login</Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Grid container justifyContent={'center'}>
            <Grid item>
              <CenteredContainer>
                <p>Don't have an account?</p>
                <Link to="/register">Sign up</Link>
              </CenteredContainer>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

const CenteredContainer = styled.div`
  width: fit-content;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;
