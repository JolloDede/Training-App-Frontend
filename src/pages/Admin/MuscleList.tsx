import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Bin from "../../components/Bin";
import Button from "../../components/Button";
import Card from "../../components/Card";
import SecondTitle from "../../components/SecondTitle";
import { useExercise } from "../../context/exercise";
import { Muscel, useMuscle } from "../../context/muscle";
import Muscle from "./Muscle";

function MuscleList() {
    const navigate = useNavigate();
    const muscleCtx = useMuscle();

    function handleDelClick(e: MouseEvent, muscle: Muscel) {
        e.stopPropagation();
        muscleCtx?.removeMuscle(muscle);
    }

    return (
        <div>
            <SecondTitle>Muscle List</SecondTitle>
            <Button onCLick={() => navigate("new")}>New Muscle</Button>
            {muscleCtx?.muscles.map((muscle, index) => (
                <Card key={index}>
                    <p className="flex select-none">{muscle.name}</p>
                    <div onClick={(e) => handleDelClick(e, muscle)} className="flex mr-0 ml-auto pt-1 cursor-pointer">
                        <Bin />
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default MuscleList;