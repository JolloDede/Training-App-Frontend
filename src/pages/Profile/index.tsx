import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Navbar, { ActivePage } from '../../components/Navbar';
import NewWorkout from './NewWorkout';
import PageTitle from '../../components/PageTitle';
import { useAuth } from '../../context/auth'
import { ExerciseProvider } from '../../context/exercise';
import { WorkoutProvider } from '../../context/workout';
import WorkoutList from './WorkoutList';


function Profile() {
    const navigate = useNavigate();
    const auth = useAuth()!;

    useEffect(() => {
        navigate("workouts");
    }, [])

    function handleNewExerciseCLick() {
        navigate("workouts/new");
    }

    return (
        <>
            <Navbar activePage={ActivePage.Profile} />
            <PageTitle>This is the Profile page.</PageTitle>
            <div className='flex'>
                <p>Welcome {auth?.user.name}</p>
            </div>
            <div className='flex'>
                <Button className='justify-center mx-auto' onCLick={handleNewExerciseCLick}>New Workout</Button>
            </div>
            <ExerciseProvider>
                <WorkoutProvider>
                    <Routes>
                        <Route index path="workouts" element={<WorkoutList />} />
                        {/* <Route path="/exercises/:id" element={<ExerciseSummary />} /> */}
                        <Route path="/workouts/new" element={<NewWorkout />} />
                    </Routes>
                </WorkoutProvider>
            </ExerciseProvider>
        </>
    )
}

export default Profile
