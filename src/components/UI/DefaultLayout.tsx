import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { validateToken } from '../../utils/auth';

const DefaultLayout = () => {
  const authenticated = useAppSelector((state) => state.auth.userInfo) && validateToken();

  if (authenticated) {
    return <Navigate replace to={'/'} />;
  }

  return <Outlet />;
};

export default DefaultLayout;
