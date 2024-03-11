import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

const DefaultLayout = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  if (userInfo) {
    return <Navigate replace to={'/'} />;
  }

  return <Outlet />;
};

export default DefaultLayout;
