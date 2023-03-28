import { useState } from "react";
import { useParams } from "react-router-dom";
import SecondTitle from "../../components/SecondTitle";
import { useExercise } from "../../context/exercise";
import EditExercise from "./EditExercise";
import EditPen from "../../components/Pen";

function ExerciseSummary() {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const exerciseCtx = useExercise();
    let activeExercise = exerciseCtx?.exercises.filter(exer => exer._id == id)[0]!;

    if (isEditing) {
        return (
            <EditExercise exercise={activeExercise} />
        );
    }
    return (
        <div>
            <SecondTitle>{activeExercise.name}</SecondTitle>
            <div onClick={() => setIsEditing(true)}>
                <EditPen />
            </div>
            <ul>
                <li className="font-bold">Muscle usage:</li>
                <ul className="list-disc list-inside">
                    {activeExercise.muscles.map((musclePercent, index) => (
                        <li key={index}>{musclePercent.muscle.name} {musclePercent.percent}</li>
                    ))}
                </ul>
            </ul>
        </div>
    );
}

export default ExerciseSummary;