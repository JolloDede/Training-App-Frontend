import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { USERURI } from "../../assets/config";
import { useAuth } from "../../context/auth";
import { ExerciseReps } from "../../context/userExercise";
import { Exercise, useExercise } from "../../context/exercise";
import SecondTitle from "../../components/SecondTitle";
import Button from "../../components/Button";
import NewUserExercise from "../Profile/NewUserExercise";
import UserExerciseComp from "../Profile/UserExerciseComp";

interface User {
    _id: string;
    username: string;
}

function User() {
    const { id } = useParams();
    const [user, setUser] = useState<User>();
    const [exerciseReps, setExerciseReps] = useState<ExerciseReps[]>([]);
    const [newExer, setNewExer] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();
    const exerciseCtx = useExercise();

    // fetch user data
    useEffect(() => {
        axios.get(USERURI + "/" + id,
            {
                headers: { 'authorization': 'Bearer ' + auth?.token }
            }).then(response => {
                const data = response.data;
                setUser(data.user);
                let exerList: ExerciseReps[] = [];
                for (let i = 0; i < data.exercises.length; i++) {
                    exerList.push({
                        exercise: exerciseCtx?.exercises.filter(exercise => exercise._id == data.exercises[i].exerciseId)[0]!,
                        repetitions: data.exercises[i].repetitions,
                        _id: data.exercises[i]._id
                    });
                }
                setExerciseReps(exerList);
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
                {newExer && <NewUserExercise displayNone={() => { setNewExer(false); navigate(0) }} />}
                {exerciseReps && exerciseReps.map(exerRep => (
                    <UserExerciseComp key={exerRep._id} exerciseRepetition={exerRep} />
                ))}
            </div>
        </div>
    );
}

export default User;