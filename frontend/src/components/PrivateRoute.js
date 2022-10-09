import React from 'react'
import { Navigate } from 'react-router-dom'
import { useDataContext } from '../context/DataContext'

const PrivateRoute = ({ children, admin }) => {
  const { isAdmin, teacher } = useDataContext();
  if(admin) return isAdmin ? children : <Navigate to="/" />
  return teacher ? children : <Navigate to="/login" />;
}

export default PrivateRoute