import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if a token exists in local storage
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token is found, kick them back to the login page
    return <Navigate to="/login" replace />;
  }

  // If a token exists, render the page they requested (the 'children')
  return children;
};

export default ProtectedRoute;