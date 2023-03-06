import { MouseEvent } from "react";
import { useExercise } from "../context/exercise";
import { useMuscle } from "../context/muscle";
import { useWorkout } from "../context/workout";

interface Props {
    children?: React.ReactNode;
}

function SyncButton({ children }: Props) {
    const muscleCtx = useMuscle()!;
    const exerciseCtx = useExercise()!;
    const workoutCtx = useWorkout()!;

    async function handleClick(e: MouseEvent) {
        await muscleCtx.sync();
        await exerciseCtx.sync();
        await workoutCtx.sync();
    }

    return (
        <button onClick={handleClick} className="bg-white text-blue-500 hover:text-blue-800 px-4 py-2 mx-2 border rounded">{children}</button>
     );
}

export default SyncButton;