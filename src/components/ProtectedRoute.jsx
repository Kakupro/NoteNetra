import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        // Redirect to login page if not authenticated
        // Using Navigate component is more appropriate here within RouterRoutes
        // navigate('/login-page'); 
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-dark-text-primary">Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login-page" replace />; // Redirect unauthenticated users
  }

  return children;
};

export default ProtectedRoute;
