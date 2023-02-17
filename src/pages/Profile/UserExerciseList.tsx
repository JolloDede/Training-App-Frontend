import { useUserExercise } from "../../context/userExercise";

function UserExerciseList() {
    const userExerciseCtx = useUserExercise();

    return (
        <>
            {userExerciseCtx?.exerciseReps.map((exerciseReps, index) => (
                <div key={index} className="border rounded-lg p-4">
                    <p>{exerciseReps.exercise.name}</p>
                    <p>{exerciseReps.repetitions}</p>
                </div>
            ))}
        </>
    );
}

export default UserExerciseList;