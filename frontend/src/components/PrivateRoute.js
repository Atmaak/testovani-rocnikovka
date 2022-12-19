import React from 'react'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { useDataContext } from '../context/DataContext'

const PrivateRoute = ({ children, admin = false, _shownOwnTest = false }) => {
  const { shownOwnTest } = useDataContext()
  const [cookies] = useCookies()
  if(_shownOwnTest) return shownOwnTest ? children : <Navigate to="/teacher" />
  if(admin) return cookies?.teacher.admin == 1 ? children : <Navigate to="/" />
  return cookies?.teacher ? children : <Navigate to="/login" />;
}

export default PrivateRoute