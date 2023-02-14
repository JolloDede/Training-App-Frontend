import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Navbar, { ActivePage } from '../../components/Navbar';
import PageTitle from '../../components/PageTitle';
import { useAuth } from '../../context/auth'
import { useExercise } from '../../context/exercise';


function Profile() {
    const auth = useAuth()!;
    const navigate = useNavigate();

    function onClickhandler() {
        auth.logout();
        navigate("/login");
    }

    return (
        <>
            <Navbar activePage={ActivePage.Profile} />
            <PageTitle>This is the Profile page.</PageTitle>
            <div className='flex'>
                <p>Welcome {auth?.user.name}</p>
                <Button className="justify-end mr-0 ml-auto" onCLick={onClickhandler}>Logout</Button>
            </div>
            <div>

            </div>
        </>
    )
}

export default Profile
