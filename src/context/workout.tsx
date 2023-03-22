import axios, { AxiosResponse } from 'axios';
import { createContext, useContext } from 'react'
import useLocalStorage from 'usehooks-ts/dist/esm/useLocalStorage/useLocalStorage';
import { LOCALSTORAGEPRESET, USEREXERURI, WORKOUTRURI } from '../assets/config';
import { useAuth } from './auth';
import { Exercise, useExercise } from './exercise';

interface Props {
    children?: React.ReactNode;
}

export type ExerciseReps = {
    exercise: Exercise;
    repetitions: number;
}

type BareExerciseRep = {
    _id: string;
    repetition: number;
}

type AddWorkoutProp = {
    name: string;
    exercises: ExerciseReps[];
    userId?: string;
}

type ExerciseRepResponse = {
    exerciseId: string;
    repetitions: number;
}

export type Workout = {
    _id: string;
    name: string;
    exercises: ExerciseReps[];
}

interface WorkoutContextType {
    workouts: Workout[];
    add: (addWorkout: AddWorkoutProp) => Promise<AxiosResponse>;
    remove: (workout: Workout) => Promise<AxiosResponse>;
    sync: () => void;
    findExercises: (ExerciseRep: ExerciseRepResponse[]) => ExerciseReps[];
}

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const WorkoutProvider = ({ children }: Props) => {
    const [workouts, setWorkouts] = useLocalStorage<Workout[]>(LOCALSTORAGEPRESET + "workout-list", []);
    const auth = useAuth()!;
    const exerciseCtx = useExercise()!;

    function exerciseFactory(ExerciseRep: ExerciseRepResponse[]): ExerciseReps[] {
        let result: ExerciseReps[] = [];
        for (let i = 0; i < ExerciseRep.length; i++) {
            result.push({ exercise: exerciseCtx.exercises.filter(exercise => exercise._id == ExerciseRep[i].exerciseId)[0]!, repetitions: ExerciseRep[i].repetitions });
        }
        return result;
    }

    async function add({ name, userId, exercises }: AddWorkoutProp) {
        const params = {
            name: name,
            exercises: exercises.map(exerciseRep => ({ exerciseId: exerciseRep.exercise._id, repetitions: exerciseRep.repetitions })),
            userId: userId || "",
        }
        return await axios.post(WORKOUTRURI, {
            params,
        }, {
            headers: { 'authorization': 'Bearer ' + auth?.token }
        }).then(response => {
            if (userId) return;
            setWorkouts([...workouts, { _id: response.data._id, name: response.data.name, exercises: exerciseFactory(response.data.exercises) }]);
        }).catch(err => {
            return err.response;
        });
    }

    async function remove(workout: Workout) {
        return await axios.delete(WORKOUTRURI + "/" + workout._id, {
            headers: { 'authorization': 'Bearer ' + auth?.token }
        }).then(response => {
            setWorkouts(workouts.filter(wkout => wkout._id != response.data._id));
        }).catch(err => {
            return err.response;
        });
    }

    function syncHelper(bareExercises: BareExerciseRep[]): ExerciseReps[] {
        let exercises: Exercise[] = JSON.parse(localStorage.getItem("training-app-exercise-list")!);
        let result: ExerciseReps[] = [];
        bareExercises.map(bareExercise => {
            return { exercise: exercises.find(exercise => exercise._id == bareExercise._id), repetition: bareExercise.repetition };
        })
        return result;
    }

    async function sync() {
        axios.get(WORKOUTRURI, {
            headers: { 'authorization': 'Bearer ' + auth?.token }
        }).then(response => {
            let workoutRes: Workout[] = [];
            for (let i = 0; i < response.data.length; i++) {
                const bareWorkout = response.data[i];
                workoutRes.push({ _id: bareWorkout._id, name: bareWorkout.name, exercises: syncHelper(bareWorkout.exercises) })
            }
            setWorkouts(workoutRes);
        });
    }

    return (
        <WorkoutContext.Provider value={{ workouts, add, remove, sync, findExercises: exerciseFactory }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export const useWorkout = () => {
    return useContext(WorkoutContext);
}