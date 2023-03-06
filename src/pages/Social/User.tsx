import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { USERURI } from "../../assets/config";
import { useAuth } from "../../context/auth";
import SecondTitle from "../../components/SecondTitle";
import Button from "../../components/Button";
import { useWorkout, Workout } from "../../context/workout";
import WorkoutCard from "../Profile/WorkoutCard";

interface User {
    _id: string;
    username: string;
}

function User() {
    const { id } = useParams();
    const [user, setUser] = useState<User>();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const navigate = useNavigate();
    const auth = useAuth();
    const workoutCtx = useWorkout()!;

    // fetch user data
    useEffect(() => {
        axios.get(USERURI + "/" + id,
            {
                headers: { 'authorization': 'Bearer ' + auth?.token }
            }).then(response => {
                const data = response.data;
                setUser(data.user);
                let workoutList: Workout[] = [];
                for (let i = 0; i < data.workouts.length; i++) {
                    workoutList.push({
                        _id: data.workouts[i]._id,
                        name: data.workouts[i].name,
                        exercises: workoutCtx?.findExercises(data.workouts[i].exercises),
                    });
                }
                setWorkouts(workoutList);
            });
    }, []);

    function handleOnClick() {
        navigate("newworkout");
    }

    return (
        <div>
            <h1>Hallo {user?.username}</h1>
            <div>
                <SecondTitle>Exercises</SecondTitle>
                <Button onCLick={handleOnClick}>Add Workout</Button>
                {workouts && workouts.map(workout => (
                    <WorkoutCard key={workout._id} workout={workout} />
                ))}
            </div>
        </div>
    );
}

export default User;