import React from 'react'
import { isLoggedIn } from '../services/authService';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

export default PrivateRoute
