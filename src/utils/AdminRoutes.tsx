import { Navigate, Outlet } from 'react-router-dom'
import { Group, useAuth } from '../context/auth'

function AdminRoutes() {
  const auth = useAuth()!;

  if (auth.user.group == Group.Admin) {
    return <Outlet />
  }

  return <Navigate to="/login" />
}

export default AdminRoutes
