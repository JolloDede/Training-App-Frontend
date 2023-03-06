import { MouseEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExercise } from "../../context/exercise";
import { ExerciseReps, useWorkout } from "../../context/workout";
import Bin from "../../components/Bin";
import Button, { RedButton } from "../../components/Button";
import Card from "../../components/Card";
import Dropdown, { DropdownOption } from "../../components/Dropdown";

function NewWorkout() {
    const { id } = useParams();
    const navigate = useNavigate();
    const workoutCtx = useWorkout();
    const exerciseCtx = useExercise()!;
    const [exerciseRepsList, setExerciseRepsList] = useState<ExerciseReps[]>([]);
    const [name, setName] = useState("New Workout");
    const [errorMsg, setErrorMsg] = useState("");

    function addExercise() {
        setExerciseRepsList([...exerciseRepsList, { exercise: exerciseCtx?.exercises[0], repetitions: 10 }])
    }

    function handleRemoveExercise(e: MouseEvent, id: number) {
        e.stopPropagation();
        setExerciseRepsList(exerciseRepsList.filter((exerciseRep, index) => index != id));
    }

    function handleEditExercise(id: number, exerciseRep: ExerciseReps) {
        setExerciseRepsList(exerciseRepsList.map((exerRep, index) => {
            if (index == id) {
                return exerciseRep;
            }
            return exerRep;
        }))
    }

    async function handleSaveClick() {
        const response = id ? await workoutCtx?.add({ name, exercises: exerciseRepsList, userId: id }) :
            await workoutCtx?.add({ name, exercises: exerciseRepsList });
        if (response) {
            console.log(response)
            setErrorMsg(response.data.message);
        } else {
            navigate(-1);
        }
    }

    function dropOptions(): DropdownOption[] {
        let result: DropdownOption[] = [];
        for (let i = 0; i < exerciseCtx.exercises.length; i++) {
            result.push({ key: exerciseCtx.exercises[i]._id.toString(), value:  exerciseCtx!.exercises[i].name })
        }
        return result;
    }

    function handleDropdownChange(id: number, option: DropdownOption, repetitions: number) {
        const exercise = exerciseCtx?.exercises.find(exercise => exercise.name == option.value)!;
        handleEditExercise(id, { exercise: exercise, repetitions: repetitions });
    }

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <p className="flex text-red-600">{errorMsg}</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-3xl font-bold hover:border rounded-lg" />
                <br />
                <label>Exercises</label>
                <br />
                <button onClick={addExercise} className="p-1 w-8 h-8 border rounded-lg">+</button>
                {exerciseRepsList.map((exerciseReps, index) => (
                    <Card key={index}>
                        <Dropdown placeholder={exerciseReps.exercise.name} options={dropOptions()} onChange={(option: DropdownOption) => handleDropdownChange(index, option, exerciseReps.repetitions)} />
                        <div className="flex justify-center m-auto font-semibold">
                            <label htmlFor="rep" className="pr-1">Repetitions:</label>
                            <input id="rep" type="number" value={exerciseReps.repetitions} onChange={e => handleEditExercise(index, { exercise: exerciseReps.exercise, repetitions: parseInt(e.target.value) })} />
                        </div>
                        <div onClick={(e) => handleRemoveExercise(e, index)} className="flex mr-0 ml-auto pt-1 cursor-pointer">
                            <Bin />
                        </div>
                    </Card>
                ))}
                <div className="mt-4">
                    <Button onCLick={handleSaveClick}>Save</Button>
                    <RedButton onCLick={() => navigate(-1)}>Cancle</RedButton>
                </div>
            </form>
        </>
    );
}

export default NewWorkout;