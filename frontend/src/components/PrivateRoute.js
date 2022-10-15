import React from 'react'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const PrivateRoute = ({ children, admin = false }) => {
  const [cookies] = useCookies()

  if(admin) return cookies?.teacher.admin == 1 ? children : <Navigate to="/" />
  return cookies?.teacher ? children : <Navigate to="/login" />;
}

export default PrivateRoute