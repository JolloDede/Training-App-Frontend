import { MouseEvent, useState } from "react";
import { useWorkout, Workout } from "../../context/workout";
import Bin from "../../components/Bin";
import Card from "../../components/Card";
import ExpandIcon from "../../components/ExpandIcon";
import ExerciseRep from "./ExerciseRep";

interface Props {
    workout: Workout;
}

function WorkoutCard({ workout }: Props) {
    const workoutCtx = useWorkout();
    const [displayExercises, setdisplayExercises] = useState(false);

    async function handleDelClick(e: MouseEvent, workout: Workout) {
        e.stopPropagation();
        const response = await workoutCtx?.remove(workout);
        if (response) {
            console.log(response);
        }
    }

    function handleExerciseDelClick(e: MouseEvent, index: number) {
        // e.stopPropagation();
        let updatedWorkout = workout;
        updatedWorkout.exercises = updatedWorkout.exercises.filter((_, id) => id != index);
        workoutCtx?.edit(updatedWorkout);
    }

    function handleExpandClick() {
        setdisplayExercises(!displayExercises);
    }

    return (
        <Card classname="flex-col border rounded-lg p-4">
            <div className="flex flex-row">
                <div onClick={handleExpandClick}><ExpandIcon classname={!displayExercises? "-rotate-90" : ""} /></div>
                <p className="flex">{workout.name}</p>
                <div onClick={(e) => handleDelClick(e, workout)} className="flex ml-auto justify-end cursor-pointer">
                    <Bin />
                </div>
            </div>
            <div className={displayExercises? "flex flex-col ml-8" : "hidden"}>
                {workout.exercises.map((exerciseRep, index) => (
                    <ExerciseRep key={workout._id+index} exerciseRep={exerciseRep} handleDelClick={(e: MouseEvent) => handleExerciseDelClick(e, index)} />
                ))}
            </div>
        </Card>
    );
}

export default WorkoutCard;