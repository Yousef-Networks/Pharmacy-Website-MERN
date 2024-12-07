
import { Route, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'
import Login from '../pages/login';

const ProtectedRoute = ({ path, children }) => {
    const { user } = useAuthContext()
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Route path={path} element={user ? children : <Login />} />
  );
};

export default ProtectedRoute;