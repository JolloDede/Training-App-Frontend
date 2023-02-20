import axios from 'axios';
import { createContext, useContext } from 'react'
import useLocalStorage from 'usehooks-ts/dist/esm/useLocalStorage/useLocalStorage';
import { USEREXERURI } from '../assets/config';
import { useAuth } from './auth';
import { Exercise, useExercise } from './exercise';

interface Props {
    children?: React.ReactNode;
}

export interface ExerciseReps {
    exercise: Exercise;
    repetitions: number;
}

interface ExerciseContextType {
    exerciseReps: ExerciseReps[];
    addExercise: Function;
    removeExercise: Function;
}

interface AddExerciseProp {
    exerciseId: string;
    repetitions: number;
}

const UserExerciseContext = createContext<ExerciseContextType | null>(null);

export const UserExerciseProvider = ({ children }: Props) => {
    const [userExercises, setUserExercise] = useLocalStorage<ExerciseReps[]>("user-exercise-list", []);
    const auth = useAuth();
    const exerciseCtx = useExercise();

    async function addExercise({ exerciseId, repetitions }: AddExerciseProp) {
        return await axios.post(USEREXERURI, {
            params: { 
                exerciseId: exerciseId,
                repetitions: repetitions,
            }
        },
            { headers: { 'authorization': 'Bearer ' + auth?.token } 
        }).then(response => {
            const data = response.data;
            const newUserExer = exerciseCtx?.exercises.filter(exercise => exercise._id = data.exerciseId);
            setUserExercise([...userExercises, { exercise: newUserExer![0], repetitions: data.repetitions }]);
        }).catch(err => {
            return err.response;
        })
    }

    function removeExercise(ex: Exercise) {
        setUserExercise(userExercises.filter((exerciseReps: ExerciseReps) => ex != exerciseReps.exercise));
    }

    return (
        <UserExerciseContext.Provider value={{ exerciseReps: userExercises, addExercise, removeExercise }}>
            {children}
        </UserExerciseContext.Provider>
    )
}

export const useUserExercise = () => {
    return useContext(UserExerciseContext);
}