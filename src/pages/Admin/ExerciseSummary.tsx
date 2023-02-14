import { useParams } from "react-router-dom";
import SecondTitle from "../../components/SecondTitle";
import { useExercise } from "../../context/exercise";

function ExerciseSummary() {
    const exerciseCtx = useExercise();
    const { id } = useParams();
    let activeExercise = exerciseCtx?.exercises[parseInt(id!)]!;

    return (
        <div>
            <SecondTitle>{activeExercise.name}</SecondTitle>

            <ul>
                <li className="font-bold">Muscle usage:</li>
                <ul className="list-disc list-inside">
                    {activeExercise.muscels.map((musclePercent, index) => (
                        <li key={index}>{musclePercent.muscle.name} {musclePercent.percent}</li>
                    ))}
                </ul>
            </ul>
        </div>
    );
}

export default ExerciseSummary;