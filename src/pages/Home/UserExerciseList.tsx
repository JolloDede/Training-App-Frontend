import { useEffect } from "react";
import Card from "../../components/Card";
import Checkbox from "../../components/CheckBox";
import { Exercise } from "../../context/exercise";
import { ExerciseReps, useUserExercise } from "../../context/userExercise";

function UserExerciseList() {
    const userExerciseCtx = useUserExercise();

    return (
        <>
            {userExerciseCtx?.exerciseReps.map((exRep: ExerciseReps, index: number) => (
                <Card key={index}>
                    <p className="flex my-auto">{exRep.exercise.name}</p>
                    <p className="flex justify-center m-auto">Repetitions: {exRep.repetitions}</p>
                    <Checkbox label={"Set 1"} />
                    <Checkbox label={"Set 2"}/>
                    <Checkbox label={"Set 3"}/>
                    <Checkbox label={"Set 4"}/>
                    <Checkbox label={"Set 5"}/>
                </Card>
            ))}
        </>
    )
}

export default UserExerciseList;