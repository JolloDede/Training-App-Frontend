import WorkoutCard from "./WorkoutCard";
import { useWorkout } from "../../context/workout";

function WorkoutList() {
    const workoutCtx = useWorkout();

    return ( 
        <div>
            {workoutCtx?.workouts.map((workout) => (
                <WorkoutCard key={workout._id} workout={workout} />
            ))}
        </div>
     );
}

export default WorkoutList;