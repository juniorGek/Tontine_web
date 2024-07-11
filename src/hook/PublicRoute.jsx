import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './useIsAuthentificated';


const PublicRoute = ({ element: Component }) => {
  return isAuthenticated() ? <Navigate to="/admin/dashboard" /> : Component;
};

export default PublicRoute;
