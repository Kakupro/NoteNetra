import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import AppIcon from './AppIcon';

const AdminRoute = ({ children }) => {
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingRole, setLoadingRole] = useState(true);
  const [errorRole, setErrorRole] = useState(null);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          const emailIsConfiguredAdmin = (user.email === 'killnoymous@gmail.com');
          if ((userDocSnap.exists() && userDocSnap.data().role === 'admin') || emailIsConfiguredAdmin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          console.error("Error fetching user role:", err);
          setErrorRole("Failed to verify admin privileges.");
          setIsAdmin(false);
        } finally {
          setLoadingRole(false);
        }
      } else {
        setIsAdmin(false);
        setLoadingRole(false);
      }
    };

    if (!loadingAuth) {
      checkAdminRole();
    }
  }, [user, loadingAuth]);

  if (loadingAuth || loadingRole) {
    return <div className="flex justify-center items-center h-screen text-lg">Checking permissions...</div>;
  }

  if (errorAuth || errorRole) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg">Error: {errorAuth?.message || errorRole}</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />; // Redirect non-admin users to admin login
  }

  return children;
};

export default AdminRoute;
