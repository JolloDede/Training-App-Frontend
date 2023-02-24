import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Group, useAuth } from '../context/auth'

function AdminRoutes() {
  const auth = useAuth()!;
  const location = useLocation();
  const locationArr = location.pathname.split("/");
  const newLocation: string = locationArr.length == 2 ? "/" : "/"+locationArr[locationArr.length-2];

  if (auth.user.group == Group.Admin) {
    return <Outlet />
  }

  return <Navigate to={newLocation} replace />;
}

export default AdminRoutes
