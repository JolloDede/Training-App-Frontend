import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { USERURI } from "../../assets/config";
import { useAuth } from "../../context/auth";
import { Exercise, useExercise } from "../../context/exercise";
import SecondTitle from "../../components/SecondTitle";
import Button from "../../components/Button";
// import NewUserExercise from "../Profile/NewUserExercise";
// import UserExerciseComp from "../Profile/UserExerciseComp";
import { useWorkout, Workout } from "../../context/workout";

interface User {
    _id: string;
    username: string;
}

function User() {
    const { id } = useParams();
    const [user, setUser] = useState<User>();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [newExer, setNewExer] = useState(false);
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
                        _id: data[i]._id,
                        name: data[i].name,
                        exercises: workoutCtx?.findExercises(data[i].exercises),
                    });
                }
                setWorkouts(workoutList);
            });
    }, []);

    function handleOnClick() {
        setNewExer(true);
    }

    return (
        <div>
            <h1>Hallo {user?.username}</h1>
            <div>
                <SecondTitle>Exercises</SecondTitle>
                <Button onCLick={handleOnClick}>Add Exercise</Button>
                {/* {newExer && <NewUserExercise displayNone={() => { setNewExer(false); navigate(0) }} />} */}
                {/* {workouts && workouts.map(exerRep => (
                    <UserExerciseComp key={exerRep._id} exerciseRepetition={exerRep} />
                ))} */}
            </div>
        </div>
    );
}

export default User;