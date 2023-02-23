import { useState } from 'react';
import Button from '../../components/Button';
import Navbar, { ActivePage } from '../../components/Navbar';
import PageTitle from '../../components/PageTitle';
import { useAuth } from '../../context/auth'
import { ExerciseProvider } from '../../context/exercise';
import { UserExerciseProvider } from '../../context/userExercise';
import NewUserExercise from './NewUserExercise';
import UserExerciseList from './UserExerciseList';


function Profile() {
    const [newUExerciseShow, setNewUExerciseShow] = useState(false);
    const auth = useAuth()!;


    function handleNewExerciseCLick() {
        setNewUExerciseShow(true);
    }

    return (
        <>
            <Navbar activePage={ActivePage.Profile} />
            <PageTitle>This is the Profile page.</PageTitle>
            <div className='flex'>
                <p>Welcome {auth?.user.name}</p>
            </div>
            <div className='flex'>
                <Button className='justify-center mx-auto' onCLick={handleNewExerciseCLick}>New Exercise</Button>
            </div>
            <ExerciseProvider>
                <UserExerciseProvider>
                    {newUExerciseShow && <NewUserExercise displayNone={() => setNewUExerciseShow(false)} />}
                    <div className='mt-2'>
                        <UserExerciseList />
                    </div>
                </UserExerciseProvider>
            </ExerciseProvider>
        </>
    )
}

export default Profile
