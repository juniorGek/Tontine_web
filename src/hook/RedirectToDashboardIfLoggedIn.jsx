import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assurez-vous du chemin correct

const RedirectToDashboardIfLoggedIn = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export default RedirectToDashboardIfLoggedIn;
