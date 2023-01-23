import { useContext, useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth'

function PrivateRoutes() {
  const auth = useAuth()!;

  if (!auth.user) {
    return <Navigate to="/login" />
  }

  return (
    <Outlet />
  )
}

export default PrivateRoutes
