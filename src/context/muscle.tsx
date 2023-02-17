import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'
import { MUSCLEURI } from '../assets/config';
import useLocalStorage from '../utils/useLocalStorage';
import { useAuth } from './auth';

interface Props {
    children?: React.ReactNode;
}

export interface Muscel {
    _id: string;
    name: string;
}

export interface MuscleUsage {
    muscle: Muscel;
    percent: number;
}

interface MuscleContextType {
    muscles: Muscel[];
    addMuscle: Function;
    removeMuscle: Function;
}

const MuscleContext = createContext<MuscleContextType | null>(null);

export const MuscleProvider = ({ children }: Props) => {
    const [muscles, setMuscles] = useLocalStorage("muscle-list");
    const auth = useAuth();

    async function addMuscle(newMucel: Muscel) {
        return await axios.post(MUSCLEURI, {
            params: { name: newMucel.name }
        },
            { headers: { 'authorization': 'Bearer ' + auth?.token } 
        }).then(response => {
            setMuscles([...muscles, response.data]);
        }).catch(err => {
            return err.response;
        })
    }

    async function removeMuscle(muc: Muscel) {
        return await axios.delete(MUSCLEURI+"/"+muc._id,
            { headers: { 'authorization': 'Bearer ' + auth?.token } 
        }).then(response => {
            setMuscles(muscles.filter((muscel: Muscel) => muscel._id != response.data._id));
        }).catch(err => {
            return err.response;
        })
    }

    return (
        <MuscleContext.Provider value={{ muscles, addMuscle, removeMuscle }}>
            {children}
        </MuscleContext.Provider>
    )
}

export const useMuscle = () => {
    return useContext(MuscleContext);
}