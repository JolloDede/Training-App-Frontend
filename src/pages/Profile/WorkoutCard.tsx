import { MouseEvent, useState } from "react";
import { useWorkout, Workout } from "../../context/workout";
import Bin from "../../components/Bin";
import Card from "../../components/Card";
import ExpandIcon from "../../components/ExpandIcon";
import ExerciseRep from "./ExerciseRep";
import { useNavigate } from "react-router-dom";
import EditPen from "../../components/Pen";

interface Props {
    workout: Workout;
}

function WorkoutCard({ workout }: Props) {
    const navigate = useNavigate();
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
                <div onClick={handleExpandClick}><ExpandIcon classname={!displayExercises ? "-rotate-90" : ""} /></div>
                <p className="flex">{workout.name}</p>
                <div className="flex ml-auto">
                    <div onClick={() => navigate(workout._id)} className="cursor-pointer">
                        <EditPen />
                    </div>
                    <div onClick={(e) => handleDelClick(e, workout)} className="cursor-pointer">
                        <Bin />
                    </div>
                </div>
            </div>
            <div className={displayExercises ? "flex flex-col ml-8" : "hidden"}>
                {workout.exercises.map((exerciseRep, index) => (
                    <ExerciseRep key={workout._id + index} exerciseRep={exerciseRep} />
                ))}
            </div>
        </Card>
    );
}

export default WorkoutCard;