import { useState } from "react";
import Bin from "../../components/Bin";
import Card from "../../components/Card";
import ExpandIcon from "../../components/ExpandIcon";
import { Workout } from "../../context/workout";
import ExerciseRepSet from "./ExerciseRepSet";

interface Props {
    workout: Workout;
}

function WorkoutCardSets({ workout }: Props) {
    const [displayExercises, setDisplayExercises] = useState(false);

    return ( 
        <Card classname="flex-col border rounded-lg p-4">
            <div className="flex flex-row">
                <div onClick={() => setDisplayExercises(!displayExercises)}><ExpandIcon classname={!displayExercises? "-rotate-90" : ""} /></div>
                <p className="flex">{workout.name}</p>
            </div>
            <div className={displayExercises? "flex flex-col ml-8" : "hidden"}>
                {workout.exercises.map((exerciseRep, index) => (
                    <ExerciseRepSet key={workout._id+index} exerciseRep={exerciseRep} />
                ))}
            </div>
        </Card>
     );
}

export default WorkoutCardSets;