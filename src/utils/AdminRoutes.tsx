import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Group, useAuth } from '../context/auth'

function AdminRoutes() {
  const auth = useAuth()!;
  const navigate = useNavigate();

  if (auth.user.group == Group.Admin) {
    return <Outlet />
  }

  return <Navigate to={-1} />;
}

export default AdminRoutes
