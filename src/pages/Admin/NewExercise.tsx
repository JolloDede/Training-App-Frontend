import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button, { RedButton } from "../../components/Button";
import { useExercise } from "../../context/exercise";
import { MuscleUsage } from "../../context/muscle";
import Muscle from "./Muscle";

function NewExercise() {
    const [name, setName] = useState("New Exercise");
    const [errorMsg, setErrorMsg] = useState("");
    const [muscleUsageList, setMuscleUsageList] = useState<MuscleUsage[]>([]);
    const exercise = useExercise();
    const navigate = useNavigate();

    function addMusclesComp() {
        let newMuscleUsage: MuscleUsage = {
            muscle: { _id: "", name: "" },
            percent: 0,
        }
        setMuscleUsageList([...muscleUsageList, newMuscleUsage])
    }

    function editMuscleComp(index: number, newMuscleUsage: MuscleUsage) {
        setMuscleUsageList(muscleUsageList.map((muscleUse, id) => {
            if (id == index) {
                return newMuscleUsage;
            }
            return muscleUse;
        }))
    }

    async function handleSaveClick() {
        const response = await exercise?.addExercise({ name, muscles: muscleUsageList });
        if (response) {
            console.log(response)
            setErrorMsg(response.data.message);
        } else {
            navigate(-1);
        }
    }

    return (
        <div className="border rounded-lg p-4">
            <p className="flex text-red-600">{errorMsg}</p>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-3xl font-bold hover:border rounded-lg" />
            <br />
            <label>Muscles</label>
            <br />
            <button onClick={addMusclesComp} className="p-1 w-8 h-8 border rounded-lg">+</button>
            {muscleUsageList.map((muscleUsage, index) => (
                <Muscle muscleUsage={muscleUsage} update={editMuscleComp} id={index} key={index} />
            ))}
            <div className="mt-4">
                <Button onCLick={handleSaveClick}>Save</Button>
                <RedButton onCLick={() => navigate(-1)}>Cancle</RedButton>
            </div>
        </div>
    );
}

export default NewExercise;