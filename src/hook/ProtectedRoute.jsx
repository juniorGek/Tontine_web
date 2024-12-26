import React from 'react';
import PropTypes from 'prop-types';
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

// Validation des props
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
