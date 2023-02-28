import axios, { AxiosResponse } from 'axios';
import { type } from 'os';
import { createContext, useContext } from 'react'
import useLocalStorage from 'usehooks-ts/dist/esm/useLocalStorage/useLocalStorage';
import { LOCALSTORAGEPRESET, USEREXERURI } from '../assets/config';
import { useAuth } from './auth';
import { Exercise, useExercise } from './exercise';

interface Props {
    children?: React.ReactNode;
}

export type ExerciseReps = {
    _id: string;
    exercise: Exercise;
    repetitions: number;
}

type AddExerciseProp = {
    exerciseId: string;
    repetitions: number;
    userId?: string;
}

type GetExerciseResponse = {
    _id: string;
    exerciseId: string;
    repetitions: number;
    userId: string;
}

interface ExerciseContextType {
    exerciseReps: ExerciseReps[];
    addExercise: (exerciseProp: AddExerciseProp) => Promise<AxiosResponse>;
    removeExercise: (ex: ExerciseReps) => Promise<AxiosResponse>;
    sync: () => void;
}

const UserExerciseContext = createContext<ExerciseContextType | null>(null);

export const UserExerciseProvider = ({ children }: Props) => {
    const [userExercises, setUserExercise] = useLocalStorage<ExerciseReps[]>(LOCALSTORAGEPRESET + "user-exercise-list", []);
    const auth = useAuth();
    const exerciseCtx = useExercise();

    function exerciseFactory(exerciseId: string): Exercise {
        return exerciseCtx?.exercises.filter(exercise => exercise._id == exerciseId)[0]!;
    }

    async function addExercise({ exerciseId, repetitions, userId }: AddExerciseProp) {
        const params = {
            exerciseId: exerciseId,
            repetitions: repetitions,
            userId: userId || "",
        }
        return await axios.post(USEREXERURI, {
            params
        },
            {
                headers: { 'authorization': 'Bearer ' + auth?.token }
            }).then(response => {
                const data = response.data;
                setUserExercise([...userExercises, { _id: data._id, exercise: exerciseFactory(data.exerciseId), repetitions: data.repetitions }]);
            }).catch(err => {
                return err.response;
            })
    }

    async function removeExercise(ex: ExerciseReps) {
        return await axios.delete(USEREXERURI + "/" + ex._id,
            {
                headers: { 'authorization': 'Bearer ' + auth?.token }
            }).then(response => {
                setUserExercise(userExercises.filter((exercise: ExerciseReps) => exercise._id != response.data._id));
            }).catch(err => {
                return err.response;
            });
    }

    function sync() {
        axios.get(USEREXERURI,
            {
                headers: { 'authorization': 'Bearer ' + auth?.token }
            }).then(response => {
                let userExerRep: ExerciseReps[] = [];
                for (let i = 0; i < response.data.length; i++) {
                    const exRep: GetExerciseResponse = response.data[i];
                    console.log(exerciseFactory(exRep.exerciseId));
                    userExerRep.push({ _id: exRep._id, exercise: exerciseFactory(exRep.exerciseId), repetitions: exRep.repetitions })
                }
                setUserExercise(userExerRep);
            })
    }

    return (
        <UserExerciseContext.Provider value={{ exerciseReps: userExercises, addExercise, removeExercise, sync }}>
            {children}
        </UserExerciseContext.Provider>
    )
}

export const useUserExercise = () => {
    return useContext(UserExerciseContext);
}