import React, { useEffect, useState } from 'react';
import { Navigate, Routes } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      setLoggedIn(false);
    }
  }, []);

  return (
    () => loggedIn ? <Component {...props} /> : <Navigate to="/" />

  )
}

export default ProtectedRoute;
