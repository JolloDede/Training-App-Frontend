import { useNavigate } from 'react-router-dom'
import Navbar, { ActivePage } from '../../components/Navbar'
import PageTitle from '../../components/PageTitle'
import { WorkoutProvider } from '../../context/workout';

function Home() {
  const navigate = useNavigate();

  function handleCLick() {
    navigate("/settings");
  }

  return (
    <>
      <Navbar activePage={ActivePage.Home} />
      <PageTitle>Home</PageTitle>
      <WorkoutProvider>
        {/* <UserExerciseList /> */}
      </WorkoutProvider>
    </>
  )
}

export default Home
