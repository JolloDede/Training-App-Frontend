import { MouseEvent, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import SecondTitle from "../../components/SecondTitle";
import { Exercise, useExerciseArr } from "../../context/exercise";
import ExerciseSummary from "./ExerciseSummary";

function ExerciseList() {
    const exerciseCtx = useExerciseArr()!;
    const navigate = useNavigate();

    return ( 
        <div>
            <SecondTitle>Exercise List</SecondTitle>
            {exerciseCtx.exercises.map((exer, index) => (
                <div key={index} onClick={() => navigate(""+index)} className="border rounded-lg p-4 my-1" >
                    <p className="select-none">{exer.name}</p>
                </div>
            ))}
        </div>
     );
}

export default ExerciseList;