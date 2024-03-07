import { Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import DefaultLayout from './components/UI/DefaultLayout';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import ProtectedLayout from './components/UI/ProtectedLayout';
import Notification from './components/Notification/Notification';

const App = () => {
  return (
    <>
      <Notification />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
