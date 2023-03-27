import { useEffect, useState } from "react";
import Dropdown, { DropdownOption } from "../../components/Dropdown";
import { MuscleUsage, useMuscle } from "../../context/muscle";

interface Props {
    muscleUsage: MuscleUsage;
    update: Function;
    id: number;
}

function Muscle({ muscleUsage, update, id }: Props) {
    const muscleCtx = useMuscle();

    function dropOptions(): DropdownOption[] {
        let result: DropdownOption[] = [];
        if (!muscleCtx) return result;
        for (let i = 0; i < muscleCtx!.muscles.length; i++) {
            result.push({ key: muscleCtx!.muscles[i]._id.toString(), value: muscleCtx!.muscles[i].name })
        }
        return result;
    }

    function handleChange(e: any) {
        update(id, { muscle: muscleUsage.muscle, percent: e.target.value })
    }

    function handleDropdownChange(option: DropdownOption) {
        const muscle = muscleCtx?.muscles.find(muscle => muscle.name == option.value)
        update(id, { muscle: muscle, percent: muscleUsage.percent });
    }

    return (
        <div>
            <Dropdown placeholder={muscleUsage.muscle.name || "Select Muscle..."} options={dropOptions()} onChange={(option: DropdownOption) => handleDropdownChange(option)} />
            <div className="mt-1">
                <label>Usage Percent: </label><input type="number" value={muscleUsage.percent} onChange={e => handleChange(e)} />
            </div>
        </div>
    );
}

export default Muscle;