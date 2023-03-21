import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button, { RedButton } from "../../components/Button";
import TextInput from "../../components/TextInput";
import { Exercise, useExercise } from "../../context/exercise";
import { MuscleUsage } from "../../context/muscle";
import Muscle from "./Muscle";

interface Props {
    exercise: Exercise;
}

function UpdateExercise({ exercise }: Props) {
    const navigate = useNavigate();
    const [name, setName] = useState(exercise.name);
    const [muscleUsageList, setMuscleUsageList] = useState(exercise.muscles);
    const exerciseCtx = useExercise()!;

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
        const response = await exerciseCtx.edit({ _id: exercise._id, name, muscles: muscleUsageList });
        if (response) {
            console.log(response)
        } else {
            navigate(-1);
        }
    }

    return (
        <div className="border rounded-lg p-2">
            <TextInput value={name} onChange={(e) => setName(e.target.value)} />
            <div>
                {muscleUsageList.map((muscleUsage, index) => (
                    <Muscle muscleUsage={muscleUsage} update={editMuscleComp} id={index} key={index} />

                ))}
                <button onClick={addMusclesComp} className="p-1 w-8 h-8 border rounded-lg">+</button>
            </div>
            <div className="mt-4">
                <Button onCLick={handleSaveClick}>Save</Button>
                <RedButton onCLick={() => navigate(-1)}>Cancle</RedButton>
            </div>
        </div>
    );
}

export default UpdateExercise;