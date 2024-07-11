// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './useIsAuthentificated';



const ProtectedRoute = ({ element: Component }) => {
  const tokenData = isAuthenticated();
  
  if (!tokenData) {
    return <Navigate to="/admin/login" />;
  }
  
  const { user } = tokenData;

  return React.cloneElement(Component, { user });
};

export default ProtectedRoute;
