import { MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Bin from "../../components/Bin";
import Button, { RedButton } from "../../components/Button";
import Card from "../../components/Card";
import Dropdown, { DropdownOption } from "../../components/Dropdown";
import { useExercise } from "../../context/exercise";
import { ExerciseReps, useWorkout, Workout } from "../../context/workout";

function WorkoutSummary() {
    const { id } = useParams();
    const navigate = useNavigate();
    const workoutCtx = useWorkout()!;
    const exerciseCtx = useExercise()!;
    let workout = (workoutCtx.workouts.filter((work) => work._id == id)[0]!);
    const [name, setName] = useState(workout.name);
    const [exerciseRepsList, setExerciseRepsList] = useState<ExerciseReps[]>(workout.exercises);


    function updateWorkout(name?: string): void {
        console.log(name)
        if (name) {
            workout.name = name;
        }
    }

    function addExercise() {
        setExerciseRepsList([...exerciseRepsList, { exercise: exerciseCtx?.exercises[0], repetitions: 10 }])
    }

    function handleRemoveExercise(e: MouseEvent, id: number) {
        e.stopPropagation();
        setExerciseRepsList(exerciseRepsList.filter((exerciseRep, index) => index != id));
    }

    async function handleSaveClick() {
        await workoutCtx?.edit({ _id: workout._id, name, exercises: exerciseRepsList });
        navigate(-1);
    }

    function handleEditExercise(id: number, exerciseRep: ExerciseReps) {
        setExerciseRepsList(exerciseRepsList.map((exerRep, index) => {
            if (index == id) {
                return exerciseRep;
            }
            return exerRep;
        }))
    }

    function dropOptions(): DropdownOption[] {
        let result: DropdownOption[] = [];
        for (let i = 0; i < exerciseCtx.exercises.length; i++) {
            result.push({ key: exerciseCtx.exercises[i]._id.toString(), value: exerciseCtx!.exercises[i].name })
        }
        return result;
    }

    function handleDropdownChange(id: number, option: DropdownOption, repetitions: number) {
        const exercise = exerciseCtx?.exercises.find(exercise => exercise.name == option.value)!;
        handleEditExercise(id, { exercise: exercise, repetitions: repetitions });
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-3xl font-bold hover:border rounded-lg" />
            <br />
            <label>Exercises</label>
            <br />
            <button onClick={addExercise} className="p-1 w-8 h-8 border rounded-lg">+</button>
            {exerciseRepsList.map((exerciseReps, index) => (
                <Card key={index}>
                    <Dropdown placeholder={exerciseReps.exercise.name} options={dropOptions()} onChange={(option: DropdownOption) => handleDropdownChange(index, option, exerciseReps.repetitions)} />
                    <div className="my-auto font-semibold">
                        <label htmlFor="rep" className="pr-1">Repetitions:</label>
                        <input id="rep" type="number" value={exerciseReps.repetitions} onChange={e => handleEditExercise(index, { exercise: exerciseReps.exercise, repetitions: parseInt(e.target.value) })} />
                    </div>
                    <div onClick={(e) => handleRemoveExercise(e, index)} className="flex pt-1 cursor-pointer">
                        <Bin />
                    </div>
                </Card>
            ))}
            <div className="mt-4">
                <Button onCLick={handleSaveClick}>Save</Button>
                <RedButton onCLick={() => navigate(-1)}>Cancle</RedButton>
            </div>
        </form>
    );
}

export default WorkoutSummary;