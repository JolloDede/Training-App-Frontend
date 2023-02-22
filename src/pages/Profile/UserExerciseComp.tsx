import { MouseEvent } from "react";
import Bin from "../../components/Bin";
import Card from "../../components/Card";
import { ExerciseReps, useUserExercise } from "../../context/userExercise";

interface Props {
    exerciseRepetition: ExerciseReps
}

function UserExerciseComp({ exerciseRepetition }: Props) {
    const userExerciseCtx = useUserExercise();

    async function handleDelClick(e: MouseEvent, exercise: ExerciseReps) {
        e.stopPropagation();
        const response = await userExerciseCtx?.removeExercise(exercise);
        if (response) {
            console.log(response);
        }
    }

    return (
        <Card classname="border rounded-lg p-4">
            <p>{exerciseRepetition.exercise.name}</p>
            <p className="justify-center mx-auto">{exerciseRepetition.repetitions}</p>
            <div onClick={(e) => handleDelClick(e, exerciseRepetition)} className="justify-end cursor-pointer">
                <Bin />
            </div>
        </Card>
    );
}

export default UserExerciseComp;