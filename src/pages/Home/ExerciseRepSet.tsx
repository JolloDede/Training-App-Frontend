import Card from "../../components/Card";
import Checkbox from "../../components/CheckBox";
import { ExerciseReps } from "../../context/workout";

interface Props {
    exerciseRep: ExerciseReps;
}

function ExerciseRepSet({ exerciseRep }: Props) {

    return (
        <Card>
            <p>{exerciseRep.exercise.name}</p>
            <p className="justify-center mx-auto font-bold">Repetitions: {exerciseRep.repetitions}</p>
            <div className="flex mt-2">
                <Checkbox label={"Set 1"} />
                <Checkbox label={"Set 2"} />
                <Checkbox label={"Set 3"} />
                <Checkbox label={"Set 4"} />
                <Checkbox label={"Set 5"} />
            </div>
        </Card>
    );
}

export default ExerciseRepSet;