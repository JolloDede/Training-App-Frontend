import axios, { AxiosResponse } from 'axios';
import { type } from 'os';
import { createContext, useContext } from 'react'
import useLocalStorage from 'usehooks-ts/dist/esm/useLocalStorage/useLocalStorage';
import { LOCALSTORAGEPRESET, USEREXERURI, WORKOUTRURI } from '../assets/config';
import { useAuth } from './auth';
import { Exercise, useExercise } from './exercise';
import { ExerciseReps } from './userExercise';

interface Props {
    children?: React.ReactNode;
}

type AddWorkoutProp = {
    name: string;
    exercises: ExerciseReps[];
    userId?: string;
}

type Workout = {
    _id: string;
    name: string;
    exercises: ExerciseReps[];
}

interface WorkoutContextType {
    workouts: Workout[];
    add: (addWorkout: AddWorkoutProp) => Promise<AxiosResponse>;
    remove: (workout: Workout) => Promise<AxiosResponse>;
    sync: () => void;
}

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const UserExerciseProvider = ({ children }: Props) => {
    const [workouts, setWorkouts] = useLocalStorage<Workout[]>(LOCALSTORAGEPRESET + "workout-list", []);
    const auth = useAuth();
    const exerciseCtx = useExercise();

    function exerciseFactory(ExerciseRep: [string, number][]): ExerciseReps[] {
        let result: ExerciseReps[] = [];
        for(let i = 0; i < ExerciseRep.length; i++) {
            result.push({exercise: exerciseCtx?.exercises.filter(exercise => exercise._id == ExerciseRep[i][0])[0]!, repetitions: ExerciseRep[i][1] });
        } 
        return result;
    }

    async function add({ name, userId, exercises}: AddWorkoutProp) {
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
            setWorkouts([...workouts, { _id: response.data._id, name: response.data.name, exercises: exerciseFactory(response.data.exercises) }]);
        }).catch(err => {
            return err.response;
        });
    }

    async function remove(workout: Workout) {
        return await axios.delete(WORKOUTRURI+"/"+workout._id,{
            headers: { 'authorization': 'Bearer ' + auth?.token }
        }).then(response => {
            setWorkouts(workouts.filter(wkout => wkout._id != response.data._id));
        }).catch(err=> {
            return err.response;
        });
    }

    async function sync() {
        axios.get(WORKOUTRURI,{
            headers: { 'authorization': 'Bearer ' + auth?.token }
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
        <WorkoutContext.Provider value={{ workouts, add, remove, sync }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export const useWorkout = () => {
    return useContext(WorkoutContext);
}