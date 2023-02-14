import { useEffect } from "react";
import Checkbox from "../../components/CheckBox";
import { Exercise } from "../../context/exercise";
import { ExerciseReps, useUserExercise } from "../../context/userExercise";
import useLocalStorage from "../../utils/useLocalStorage";

function UserExerciseList() {
    const userExerciseCtx = useUserExercise();

    return (
        <>
            {userExerciseCtx?.exercises.map((exRep: ExerciseReps, index: number) => (
                <div key={index} className="flex border rounded-lg p-4 my-1">
                    <p className="flex my-auto">{exRep.exercise.name}</p>
                    <p className="flex justify-center m-auto">Repetitions: {exRep.repetitions}</p>
                    <Checkbox label={"Set 1"} />
                    <Checkbox label={"Set 2"}/>
                    <Checkbox label={"Set 3"}/>
                    <Checkbox label={"Set 4"}/>
                    <Checkbox label={"Set 5"}/>
                </div>
            ))}
        </>
    )
}

export default UserExerciseList;