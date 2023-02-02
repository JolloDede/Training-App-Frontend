import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button, { RedButton } from "../../components/Button";
import { MuscleUsage, useExerciseCtx } from "../../context/exercise";
import Muscle from "./Muscle";
import MuscleList from "./MuscleList";

function NewExercise() {
    const [name, setName] = useState("New Exercise");
    const [muscleUsageList, setMuscleUsageList] = useState<MuscleUsage[]>([]);
    const exercise = useExerciseCtx();
    const navigate = useNavigate();

    function addMusclesComp() {
        let newMuscleUsage: MuscleUsage = {
            muscle: { name: "Tyceps" },
            percent: 0,
        }
        setMuscleUsageList([...muscleUsageList, newMuscleUsage])
    }

    function handleSaveClick() {
        exercise?.addExercise({ name, muscels: muscleUsageList });
        navigate(-1);
    }

    return (
        <div className="border rounded-lg p-4">
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-3xl font-bold hover:border rounded-lg" />
            <br />
            <label>Muscles</label>
            <br />
            <button onClick={addMusclesComp} className="p-1 w-8 h-8 border rounded-lg">+</button>
            {muscleUsageList.map((muscleUsage, index) => (
                <Muscle muscleUsage={muscleUsage} key={index} />
            ))}
            <div className="mt-4">
                <Button onCLick={handleSaveClick}>Save</Button>
                <RedButton onCLick={() => navigate(-1)}>Cancle</RedButton>
            </div>
        </div>
    );
}

export default NewExercise;