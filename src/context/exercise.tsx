import { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../utils/useLocalStorage';

interface Props {
    children?: React.ReactNode;
}

export interface Muscel {
    name: string
}

export interface MuscleUsage {
    muscle: Muscel;
    percent: number;
}

export interface Exercise {
    name: string;
    muscels: MuscleUsage[];
}

interface ExerciseContextType {
    exercises: Exercise[];
    muscles: Muscel[];
    addExercise: Function;
    removeExercise: Function;
    addMuscle: Function;
    removeMuscle: Function;
}

const ExerciseContext = createContext<ExerciseContextType | null>(null);

export const ExerciseProvider = ({ children }: Props) => {
    const [exercises, setExercise] = useLocalStorage("exercise-list");
    const [muscles, setMuscles] = useLocalStorage("muscle-list");

    function addExercise(newExercise: Exercise) {
        setExercise([...exercises, newExercise])
    }

    function removeExercise(ex: Exercise) {
        setExercise(exercises.filter((exercise: Exercise) => ex != exercise));
    }

    function addMuscle(newMucel: Muscel) {
        setExercise([...muscles, newMucel])
    }

    function removeMuscle(muc: Muscel) {
        setExercise(exercises.filter((mucel: Muscel) => muc != mucel));
    }

    useEffect(() => {
        if (!muscles) { setMuscles(initMuscles()) }
    }, [])

    return (
        <ExerciseContext.Provider value={{ exercises, muscles, addExercise, removeExercise, addMuscle, removeMuscle }}>
            {children}
        </ExerciseContext.Provider>
    )
}

function initMuscles(): Muscel[] {
    return [{ "name": "Tryceps" }, { "name": "Lats" }]
}

export const useExerciseCtx = () => {
    return useContext(ExerciseContext);
}