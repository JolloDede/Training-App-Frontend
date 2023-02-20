import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from 'usehooks-ts/dist/esm/useLocalStorage/useLocalStorage';
import { EXERCISEURI } from '../assets/config';
import { useAuth } from './auth';
import { MuscleUsage } from './muscle';

interface Props {
    children?: React.ReactNode;
}

export interface Exercise {
    _id: string;
    name: string;
    muscles: MuscleUsage[];
}

interface ExerciseContextType {
    exercises: Exercise[];
    addExercise: Function;
    removeExercise: Function;
}

const ExerciseContext = createContext<ExerciseContextType | null>(null);

export const ExerciseProvider = ({ children }: Props) => {
    const [exercises, setExercise] = useLocalStorage<Exercise[]>("exercise-list", []);
    const auth = useAuth();

    async function addExercise(newExercise: Exercise) {
        return await axios.post(EXERCISEURI, {
            params: { 
                name: newExercise.name,
                muscles: newExercise.muscles,
            }
        },
            { headers: { 'authorization': 'Bearer ' + auth?.token } 
        }).then(response => {
            setExercise([...exercises, response.data]);
        }).catch(err => {
            return err.response;
        })
    }

    async function removeExercise(ex: Exercise) {
        return await axios.delete(EXERCISEURI+"/"+ex._id,
            { headers: { 'authorization': 'Bearer ' + auth?.token } 
        }).then(response => {
            setExercise(exercises.filter((exercise: Exercise) => exercise._id != response.data._id));
        }).catch(err => {
            return err.response;
        })
    }

    return (
        <ExerciseContext.Provider value={{ exercises, addExercise, removeExercise }}>
            {children}
        </ExerciseContext.Provider>
    )
}

export const useExercise = () => {
    return useContext(ExerciseContext);
}