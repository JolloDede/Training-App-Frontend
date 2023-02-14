import { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../utils/useLocalStorage';
import { Exercise } from './exercise';
import { MuscleUsage } from './muscle';

interface Props {
    children?: React.ReactNode;
}

export interface ExerciseReps {
    exercise: Exercise;
    repetitions: number;
}

interface ExerciseContextType {
    exercises: ExerciseReps[];
    addExercise: Function;
    removeExercise: Function;
}

const UserExerciseContext = createContext<ExerciseContextType | null>(null);

export const UserExerciseProvider = ({ children }: Props) => {
    const [exercises, setExercise] = useLocalStorage("user-exercise-list");

    function addExercise(newExercise: Exercise) {
        setExercise([...exercises, newExercise])
    }

    function removeExercise(ex: Exercise) {
        setExercise(exercises.filter((exercise: Exercise) => ex != exercise));
    }

    return (
        <UserExerciseContext.Provider value={{ exercises, addExercise, removeExercise }}>
            {children}
        </UserExerciseContext.Provider>
    )
}

export const useUserExercise = () => {
    return useContext(UserExerciseContext);
}