import axios, { AxiosResponse } from 'axios';
import { createContext, useContext } from 'react'
import useLocalStorage from 'usehooks-ts/dist/esm/useLocalStorage/useLocalStorage';
import { LOCALSTORAGEPRESET, USEREXERURI, WORKOUTRURI } from '../assets/config';
import { useAuth } from './auth';
import { Exercise, LOCALSTORAGEEXERCISES, useExercise } from './exercise';

interface Props {
    children?: React.ReactNode;
}

export type ExerciseReps = {
    exercise: Exercise;
    repetitions: number;
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
    edit: (workout: Workout, userId?: string) => void;
    sync: () => void;
    findExercises: (ExerciseRep: ExerciseRepResponse[]) => ExerciseReps[];
}

const WorkoutContext = createContext<WorkoutContextType | null>(null);
export const LOCALSTORAGEWORKOUTS = LOCALSTORAGEPRESET + "workout-list";


export const WorkoutProvider = ({ children }: Props) => {
    const [workouts, setWorkouts] = useLocalStorage<Workout[]>(LOCALSTORAGEWORKOUTS, []);
    const auth = useAuth()!;

    function exerciseFactory(exerciseRep: ExerciseRepResponse[]): ExerciseReps[] {
        let exercises: Exercise[] = JSON.parse(localStorage.getItem(LOCALSTORAGEEXERCISES)!);
        let result = exerciseRep.map(exerciseRep => {
            return { exercise: exercises.find(exercise => exercise._id == exerciseRep.exerciseId)!, repetitions: exerciseRep.repetitions };
        })
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
            headers: { 'authorization': 'Bearer ' + auth.token }
        }).then(response => {
            if (userId) return;
            setWorkouts([...workouts, { _id: response.data._id, name: response.data.name, exercises: exerciseFactory(response.data.exercises) }]);
        }).catch(err => {
            return err.response;
        });
    }

    async function remove(workout: Workout) {
        return await axios.delete(WORKOUTRURI + "/" + workout._id, {
            headers: { 'authorization': 'Bearer ' + auth.token }
        }).then(response => {
            setWorkouts(workouts.filter(wkout => wkout._id != response.data._id));
        }).catch(err => {
            return err.response;
        });
    }

    async function edit(workout: Workout, userId?: string) {
        const params = {
            _id: workout._id,
            name: workout.name,
            exercises: workout.exercises.map(exerciseRepetition => ({ exerciseId: exerciseRepetition.exercise._id, repetitions: exerciseRepetition.repetitions })),
            userId: userId || "",
        };
        axios.put(WORKOUTRURI, {
            params,
        }, {
            headers: { 'authorization': 'Bearer ' + auth.token }
        }).then(response => {
            setWorkouts(workouts.map(work => {
                if (work._id == response.data._id) {
                    const updatedWorkout: Workout = {
                        _id: response.data._id,
                        name: response.data.name,
                        exercises: exerciseFactory(response.data.exercises),
                    }
                    return updatedWorkout;
                } else {
                    return work;
                }
            }))
        })
    }

    async function sync() {
        axios.get(WORKOUTRURI, {
            headers: { 'authorization': 'Bearer ' + auth.token }
        }).then(response => {
            let workoutRes: Workout[] = [];
            for (let i = 0; i < response.data.length; i++) {
                const bareWorkout = response.data[i];
                workoutRes.push({ _id: bareWorkout._id, name: bareWorkout.name, exercises: exerciseFactory(bareWorkout.exercises) })
            }
            setWorkouts(workoutRes);
        });
    }

    return (
        <WorkoutContext.Provider value={{ workouts, add, remove, edit, sync, findExercises: exerciseFactory }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export const useWorkout = () => {
    return useContext(WorkoutContext);
}