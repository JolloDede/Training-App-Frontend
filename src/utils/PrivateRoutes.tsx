import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { ExerciseProvider } from '../context/exercise';
import { MuscleProvider } from '../context/muscle';
import { WorkoutProvider } from '../context/workout';

function PrivateRoutes() {
  const auth = useAuth()!;

  if (auth.user.name == "") {
    return <Navigate to="/login" />
  }

  return (
    <MuscleProvider>
      <ExerciseProvider>
        <WorkoutProvider>
          <Outlet />
        </WorkoutProvider>
      </ExerciseProvider>
    </MuscleProvider>
  )
}

export default PrivateRoutes
