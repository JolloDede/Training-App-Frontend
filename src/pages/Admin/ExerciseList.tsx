import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import SecondTitle from "../../components/SecondTitle";
import { Exercise, useExercise } from "../../context/exercise";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Bin from "../../components/Bin";

function ExerciseList() {
    const exerciseCtx = useExercise()!;
    const navigate = useNavigate();

    async function handleDelClick(e: MouseEvent, exercise: Exercise) {
        e.stopPropagation();
        const response = await exerciseCtx.removeExercise(exercise);;
        if (response) {
            console.log(response);
        }
    }

    return (
        <div>
            <SecondTitle>Exercise List</SecondTitle>
            <Button onCLick={() => navigate("new")}>New Exercise</Button>
            {exerciseCtx.exercises.map((exer, index) => (
                <Card key={index} onClick={() => navigate("" + exer._id)}>
                    <p className="flex select-none">{exer.name}</p>
                    <div onClick={(e) => handleDelClick(e, exer)} className="flex mr-0 ml-auto pt-1 cursor-pointer">
                        <Bin />
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default ExerciseList;