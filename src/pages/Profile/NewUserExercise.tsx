import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button, { RedButton } from "../../components/Button";
import Dropdown, { DropdownOption } from "../../components/Dropdown";
import { useExercise } from "../../context/exercise";
import { MuscleUsage } from "../../context/muscle";
import { ExerciseReps, useUserExercise } from "../../context/userExercise";

interface Props {
    displayNone: Function;
}

function NewUserExercise({ displayNone }: Props) {
    const [exercise, setExercise] = useState<number>();
    const [repetitions, setRepetitions] = useState<number>(10);
    const [errorMsg, setErrorMsg] = useState("");
    const exerciseCtx = useExercise();
    const userExerciseCtx = useUserExercise();
    const navigate = useNavigate();

    function dropOptions(): DropdownOption[] {
        let result: DropdownOption[] = [];
        if (!exerciseCtx) return result;
        for (let i = 0; i < exerciseCtx!.exercises.length; i++) {
            result.push({ key: exerciseCtx!.exercises[i]._id.toString(), value: exerciseCtx!.exercises[i].name })
        }
        return result;
    }

    function handleDropdownChange(option: DropdownOption) {
        setExercise(parseInt(option.key));
    }

    async function handleSaveClick() {
        const response = await userExerciseCtx?.addExercise({ exerciseId: exercise, repetitions });
        console.log(response)
        if (response) {
            console.log(response)
            setErrorMsg(response.data.message);
        } else {
            navigate(0);
        }
    }

    return (
        <div className="border rounded-lg p-4">
            <p className="flex text-red-600">{errorMsg}</p>
            <div className="flex">
                <Dropdown placeholder="Select..." options={dropOptions()} onChange={handleDropdownChange} />
                <input className="ml-2" type="number" value={repetitions} onChange={e => setRepetitions(parseInt(e.target.value))} />
            </div>
            <div className="mt-4">
                <Button onCLick={handleSaveClick}>Save</Button>
                <RedButton onCLick={() => displayNone()}>Cancle</RedButton>
            </div>
        </div>
    );
}

export default NewUserExercise;