import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {
  return (
    props.loggedIn ? <Component {...props} /> : (props.isFirstAuth ? <Navigate to="/welcome" replace /> : <Navigate to="/" replace />)
  );
};

export default ProtectedRoute;
