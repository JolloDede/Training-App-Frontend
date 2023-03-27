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
import WorkoutSummary from './WorkoutSummary';


function Profile() {
    const navigate = useNavigate();
    const auth = useAuth()!;

    useEffect(() => {
        navigate("workouts");
    }, [])

    return (
        <>
            <Navbar activePage={ActivePage.Profile} />
            <PageTitle>This is the Profile page.</PageTitle>
            <div className='flex'>
                <p>Welcome {auth?.user.name}</p>
            </div>
            <ExerciseProvider>
                <WorkoutProvider>
                    <Routes>
                        <Route index path="workouts" element={<WorkoutList />} />
                        <Route path="/workouts/:id" element={<WorkoutSummary />} />
                        <Route path="/workouts/new" element={<NewWorkout />} />
                    </Routes>
                </WorkoutProvider>
            </ExerciseProvider>
        </>
    )
}

export default Profile
