import { MouseEvent } from "react";
import Bin from "../../components/Bin";
import Card from "../../components/Card";
import { ExerciseReps } from "../../context/workout";

interface Props {
    exerciseRep: ExerciseReps;
}

function ExerciseRep({ exerciseRep }: Props) {
    return (
        <Card>
            <p>{exerciseRep.exercise.name}</p>
            <p className="justify-center mx-auto font-bold">Repetitions: {exerciseRep.repetitions}</p>
            {/* <div onClick={(e) => handleDelClick(e, exerciseRep)} className="flex ml-auto justify-end cursor-pointer">
                <Bin />
            </div> */}
        </Card>
    );
}

export default ExerciseRep;