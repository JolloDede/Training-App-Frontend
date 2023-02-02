import Dropdown, { DropdownOption } from "../../components/Dropdown";
import { MuscleUsage, useExerciseCtx } from "../../context/exercise";

interface Props {
    muscleUsage: MuscleUsage;
}

function Muscle({ muscleUsage }: Props) {
    const ExerciseArr = useExerciseCtx();

    function dropOptions(): DropdownOption[] {
        let result: DropdownOption[] = [];
        if (!ExerciseArr) return result;
        for (let i = 0; i < ExerciseArr!.muscles.length; i++) {
            result.push({ key: ExerciseArr!.muscles[i].name, value:  ExerciseArr!.muscles[i].name })
        }
        return result;
    }

    return (
        <div>
            <Dropdown placeholder="Select..." options={dropOptions()} />
            <input type="number" defaultValue={muscleUsage.percent} />
        </div>
    );
}

export default Muscle;