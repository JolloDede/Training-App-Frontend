import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.69231 8.70833H5V8.16667H9.84615M7.69231 8.70833V19H16.3077V8.70833M7.69231 8.70833H16.3077M16.3077 8.70833H19V8.16667H14.1538M9.84615 8.16667V6H14.1538V8.16667M9.84615 8.16667H14.1538" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M10 11V17" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 11V17" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 11V17" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default MuscleList;