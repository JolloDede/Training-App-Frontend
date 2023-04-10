import { useState } from "react";
import { useExercise } from "../context/exercise";
import { useMuscle } from "../context/muscle";
import { useWorkout } from "../context/workout";
import LoadSpinner from "./LoadSpinner";

interface Props {
    children?: React.ReactNode;
}

function SyncButton({ children }: Props) {
    const [isSync, setIsSync] = useState(false);
    const muscleCtx = useMuscle()!;
    const exerciseCtx = useExercise()!;
    const workoutCtx = useWorkout()!;

    async function handleClick() {
        setIsSync(true);
        await muscleCtx.sync();
        await exerciseCtx.sync();
        await workoutCtx.sync();
        setIsSync(false);
    }

    return (
        <div>
            <button onClick={handleClick} className="bg-white text-blue-500 hover:text-blue-800 px-4 py-2 mx-2 border rounded">{children}</button>
            {isSync && <LoadSpinner />}
        </div>
    );
}

export default SyncButton;