import WorkoutCard from "./WorkoutCard";
import { useWorkout } from "../../context/workout";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function WorkoutList() {
    const navigate = useNavigate();
    const workoutCtx = useWorkout();

    function handleNewExerciseCLick() {
        navigate("new");
    }

    return (
        <div>
            <div className='flex'>
                <Button className='justify-center mx-auto' onCLick={handleNewExerciseCLick}>New Workout</Button>
            </div>
            {workoutCtx?.workouts.map((workout) => (
                <WorkoutCard key={workout._id} workout={workout} />
            ))}
        </div>
    );
}

export default WorkoutList;