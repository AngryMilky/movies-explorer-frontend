import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      setLoggedIn(false);
    }
  }, []);

  return (
    <Route>
      {
        () => loggedIn ? <Component {...props} /> : <Navigate to="/" />
      }
    </Route>
  )
}

export default ProtectedRoute;
