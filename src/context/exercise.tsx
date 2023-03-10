import axios, { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from 'usehooks-ts/dist/esm/useLocalStorage/useLocalStorage';
import { EXERCISEURI, LOCALSTORAGEPRESET } from '../assets/config';
import { useAuth } from './auth';
import { MuscleUsage } from './muscle';

interface Props {
    children?: React.ReactNode;
}

export type Exercise = {
    _id: string;
    name: string;
    muscles: MuscleUsage[];
}

export type NewExercise = {
    name: string;
    muscles: MuscleUsage[];
}


interface ExerciseContextType {
    exercises: Exercise[];
    addExercise: (newExercise: NewExercise) => Promise<AxiosResponse>;
    removeExercise: (exercise: Exercise) => Promise<AxiosResponse>;
    sync: () => void;
}

const ExerciseContext = createContext<ExerciseContextType | null>(null);

export const ExerciseProvider = ({ children }: Props) => {
    const [exercises, setExercise] = useLocalStorage<Exercise[]>(LOCALSTORAGEPRESET + "exercise-list", []);
    const auth = useAuth();

    async function addExercise(newExercise: NewExercise) {
        return await axios.post(EXERCISEURI, {
            params: {
                name: newExercise.name,
                muscles: newExercise.muscles,
            }
        },
            {
                headers: { 'authorization': 'Bearer ' + auth?.token }
            }).then(response => {
                setExercise([...exercises, response.data]);
            }).catch(err => {
                return err.response;
            })
    }

    async function removeExercise(ex: Exercise) {
        return await axios.delete(EXERCISEURI + "/" + ex._id,
            {
                headers: { 'authorization': 'Bearer ' + auth?.token }
            }).then(response => {
                setExercise(exercises.filter((exercise: Exercise) => exercise._id != response.data._id));
            }).catch(err => {
                return err.response;
            })
    }

    function sync() {
        axios.get(EXERCISEURI,
            {
                headers: { 'authorization': 'Bearer ' + auth?.token }
            }).then(response => {
                setExercise(response.data);
            });
    }

    return (
        <ExerciseContext.Provider value={{ exercises, addExercise, removeExercise, sync }}>
            {children}
        </ExerciseContext.Provider>
    )
}

export const useExercise = () => {
    return useContext(ExerciseContext);
}