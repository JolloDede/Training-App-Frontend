import { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../utils/useLocalStorage';

interface ExerciseContextType {
    exercises: Exercise[];
}

interface Props {
    children?: React.ReactNode;
}

interface Muscel {
    name: string
}

interface MuscleUsage {
    muscle: Muscel;
    percent: number;
}

export interface Exercise {
    name: string;
    muscels: MuscleUsage[];
}

const ExerciseContext = createContext<ExerciseContextType | null>(null);

export const ExerciseProvider = ({ children }: Props) => {
    const [exercises, setExercise] = useLocalStorage("exercise-list");
    const [muscles, setMuscles] = useLocalStorage("muscle-list");

    useEffect(() => {
        if (!muscles) { setMuscles(initMuscles())}
        if (!exercises) { setExercise(initExercises()) }
    }, [])

    return (
        <ExerciseContext.Provider value={{ exercises }}>
            {children}
        </ExerciseContext.Provider>
    )
}

function initMuscles(): Muscel[] {
    return [{"name":"Tryceps"},{"name":"Lats"}]
}

function initExercises(): Exercise[] {
    let exList: Exercise[] = [];
    exList.push({"name":"Push up", "muscels": [{ "muscle": { "name": "Tryceps" }, "percent": 20 }]});
    exList.push({"name":"Pullup", "muscels": [{ "muscle": { "name": "Lats" }, "percent": 20 }]});

    return exList;
}

export const useExerciseArr = () => {
    return useContext(ExerciseContext);
}