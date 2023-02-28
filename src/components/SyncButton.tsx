import { MouseEvent } from "react";
import { useExercise } from "../context/exercise";
import { useMuscle } from "../context/muscle";
import { useUserExercise } from "../context/userExercise";

interface Props {
    children?: React.ReactNode;
}

function SyncButton({ children }: Props) {
    const muscleCtx = useMuscle()!;
    const exerciseCtx = useExercise()!;
    const userExerciseCtx = useUserExercise()!;

    async function handleClick(e: MouseEvent) {
        await muscleCtx.sync();
        await exerciseCtx.sync();
        await userExerciseCtx.sync();
    }

    return (
        <button onClick={handleClick} className="bg-white text-blue-500 hover:text-blue-800 px-4 py-2 mx-2 border rounded">{children}</button>
     );
}

export default SyncButton;