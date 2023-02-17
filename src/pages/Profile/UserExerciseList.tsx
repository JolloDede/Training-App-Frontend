import Bin from "../../components/Bin";
import Card from "../../components/Card";
import { useUserExercise } from "../../context/userExercise";

function UserExerciseList() {
    const userExerciseCtx = useUserExercise();

    return (
        <>
            {userExerciseCtx?.exerciseReps.map((exerciseReps, index) => (
                <Card key={index} classname="border rounded-lg p-4">
                    <p>{exerciseReps.exercise.name}</p>
                    <p className="justify-center mx-auto">{exerciseReps.repetitions}</p>
                    <div className="justify-end">
                        <Bin />
                    </div>
                </Card>
            ))}
        </>
    );
}

export default UserExerciseList;