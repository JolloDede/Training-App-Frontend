import { MouseEvent } from "react";
import Bin from "../../components/Bin";
import Card from "../../components/Card";
import { ExerciseReps, useUserExercise } from "../../context/userExercise";

function UserExerciseList() {
    const userExerciseCtx = useUserExercise();

    async function handleDelClick(e: MouseEvent, exercise: ExerciseReps) {
        e.stopPropagation();
        const response = await userExerciseCtx?.removeExercise(exercise);
        if (response) {
            console.log(response);
        }
    }

    return (
        <>
            {userExerciseCtx?.exerciseReps.map((exerciseReps, index) => (
                <Card key={index} classname="border rounded-lg p-4">
                    <p>{exerciseReps.exercise.name}</p>
                    <p className="justify-center mx-auto">{exerciseReps.repetitions}</p>
                    <div onClick={(e) => handleDelClick(e, exerciseReps)} className="justify-end">
                        <Bin />
                    </div>
                </Card>
            ))}
        </>
    );
}

export default UserExerciseList;