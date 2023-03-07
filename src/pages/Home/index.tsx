import { useNavigate } from 'react-router-dom'
import Navbar, { ActivePage } from '../../components/Navbar'
import PageTitle from '../../components/PageTitle'
import { WorkoutProvider } from '../../context/workout';
import WorkoutList from './WorkoutList';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar activePage={ActivePage.Home} />
      <PageTitle>Home</PageTitle>
      <WorkoutProvider>
        <WorkoutList />
      </WorkoutProvider>
    </>
  )
}

export default Home
