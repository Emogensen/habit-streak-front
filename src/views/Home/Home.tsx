import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import { Button } from '@mui/material';
import { getUser } from '../../slices/userSlice';
import { useCallback, useEffect } from 'react';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const userProfile = useAppSelector((state) => state.user.userProfileData);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUser(userInfo.id));
    }
  }, [userInfo, dispatch, handleLogout]);

  return (
    <CenteredContainer>
      <Heading>Welcome {userProfile?.name}!</Heading>
      <Heading>Email: {userProfile?.email}</Heading>
      <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>
        Logout
      </Button>
    </CenteredContainer>
  );
};

export default Home;

const CenteredContainer = styled.div`
  width: fit-content;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
