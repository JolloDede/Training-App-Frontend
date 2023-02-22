import { ExerciseReps, useUserExercise } from "../../context/userExercise";
import UserExerciseComp from "./UserExerciseComp";

function UserExerciseList() {
    const userExerciseCtx = useUserExercise();

    return (
        <>
            {userExerciseCtx?.exerciseReps.map((exerciseReps) => (
                <UserExerciseComp key={exerciseReps._id} exerciseRepetition={exerciseReps} />
            ))}
        </>
    );
}

export default UserExerciseList;