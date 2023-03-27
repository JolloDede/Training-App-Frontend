import { MouseEvent } from "react";
import Bin from "../../components/Bin";
import Card from "../../components/Card";
import { ExerciseReps } from "../../context/workout";

interface Props {
    exerciseRep: ExerciseReps;
    handleDelClick?: (e: MouseEvent) => any;
}

function ExerciseRep({ exerciseRep, handleDelClick }: Props) {

    return (
        <Card>
            <p>{exerciseRep.exercise.name}</p>
            <p className="justify-center mx-auto font-bold">Repetitions: {exerciseRep.repetitions}</p>
            {/* <div onClick={handleDelClick} className="flex ml-auto justify-end cursor-pointer">
                <Bin />
            </div> */}
        </Card>
    );
}

export default ExerciseRep;