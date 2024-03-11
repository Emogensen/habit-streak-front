import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

const ProtectedLayout = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  if (!userInfo) {
    return <Navigate replace to={'/login'} />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
