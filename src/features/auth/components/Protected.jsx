import React from 'react'
import { useAuth } from '../context/useAuth'
import { Navigate } from "react-router"
import Loader from '../../../components/Loader';

const Protected = ({ children }) => {

  const { loader, user } = useAuth();

  if (loader) return <Loader />

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protected