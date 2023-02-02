
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button, { RedButton } from "../../components/Button";
import { MuscleUsage, useExerciseCtx } from "../../context/exercise";
import Muscle from "./Muscle";
import MuscleList from "./MuscleList";

function NewMuscle() {
    const [name, setName] = useState("New Muscle");
    const exercise = useExerciseCtx();
    const navigate = useNavigate();

    function handleSaveClick() {
        exercise?.addMuscle({ name });
        navigate(-1);
    }

    return (
        <div className="border rounded-lg p-4">
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-3xl font-bold hover:border rounded-lg" />
            <div className="mt-4">
                <Button onCLick={handleSaveClick}>Save</Button>
                <RedButton onCLick={() => navigate(-1)}>Cancle</RedButton>
            </div>
        </div>
    );
}

export default NewMuscle;