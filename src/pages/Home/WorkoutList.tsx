import { useWorkout } from "../../context/workout";
import WorkoutCardSets from "./WorkoutCardSets";


function WorkoutList() {
    const workoutCtx = useWorkout();

    return ( 
        <div>
            {workoutCtx?.workouts.map((workout) => (
                <WorkoutCardSets key={workout._id} workout={workout} />
            ))}
        </div>
     );
}

export default WorkoutList;