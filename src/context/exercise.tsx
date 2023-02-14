import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'
import { EXERCISEURI } from '../assets/config';
import useLocalStorage from '../utils/useLocalStorage';
import { useAuth } from './auth';
import { MuscleUsage } from './muscle';

interface Props {
    children?: React.ReactNode;
}

export interface Exercise {
    name: string;
    muscels: MuscleUsage[];
}

interface ExerciseContextType {
    exercises: Exercise[];
    addExercise: Function;
    removeExercise: Function;
}

const ExerciseContext = createContext<ExerciseContextType | null>(null);

export const ExerciseProvider = ({ children }: Props) => {
    const [exercises, setExercise] = useLocalStorage("exercise-list");
    const auth = useAuth();

    async function addExercise(newExercise: Exercise) {
        return await axios.post(EXERCISEURI, {
            params: { 
                name: newExercise.name,
                muscles: newExercise.muscels,
            }
        },
            { headers: { 'authorization': 'Bearer ' + auth?.token } 
        }).then(response => {
            setExercise([...exercises, response.data]);
        }).catch(err => {
            return err.response;
        })
    }

    function removeExercise(ex: Exercise) {
        setExercise(exercises.filter((exercise: Exercise) => ex != exercise));
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