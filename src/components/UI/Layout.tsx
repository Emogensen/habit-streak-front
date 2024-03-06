import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import styled from '@emotion/styled';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
`;
