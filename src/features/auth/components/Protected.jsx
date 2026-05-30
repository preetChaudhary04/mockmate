import React from 'react'
import { useAuth } from '../context/useAuth'
import { Navigate } from "react-router"

const Protected = ({ children }) => {

  const { loader, user } = useAuth();

  if (loader) return (<h1>loading...</h1>)

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protected