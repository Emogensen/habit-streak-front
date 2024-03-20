import styled from '@emotion/styled';
import Navbar from '../Navbar/Navbar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

const ProtectedLayout = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  if (!userInfo) {
    return <Navigate replace to={'/login'} />;
  }

  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default ProtectedLayout;

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  background-color: rgba(92, 219, 149, 1);
`;
