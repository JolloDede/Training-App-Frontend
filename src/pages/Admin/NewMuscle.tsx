
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button, { RedButton } from "../../components/Button";
import { useExercise } from "../../context/exercise";
import { useMuscle } from "../../context/muscle";

function NewMuscle() {
    const [name, setName] = useState("New Muscle");
    const [errorMsg, setErrorMsg] = useState("");
    const muscleCtx = useMuscle();
    const navigate = useNavigate();

    async function handleSaveClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const response = await muscleCtx?.addMuscle({ name })
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
            <form>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-3xl font-bold hover:border rounded-lg" />
                <div className="mt-4">
                    <Button onCLick={(e: MouseEvent<HTMLButtonElement>) => handleSaveClick(e)}>Save</Button>
                    <RedButton onCLick={(e: MouseEvent<HTMLButtonElement>) => { e.preventDefault(); navigate(-1) }}>Cancle</RedButton>
                </div>
            </form>
        </div>
    );
}

export default NewMuscle;