import axios, { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from 'usehooks-ts/dist/esm/useLocalStorage/useLocalStorage';
import { LOCALSTORAGEPRESET, MUSCLEURI } from '../assets/config';
import { useAuth } from './auth';

interface Props {
    children?: React.ReactNode;
}

export type Muscel = {
    _id: string;
    name: string;
}

export type NewMuscel = {
    name: string;
}

export type MuscleUsage = {
    muscle: Muscel;
    percent: number;
}

interface MuscleContextType {
    muscles: Muscel[];
    addMuscle: (newMuscle: NewMuscel) => Promise<AxiosResponse>;
    removeMuscle: (muscle: Muscel) => Promise<AxiosResponse>;
    sync: () => void;
}

const MuscleContext = createContext<MuscleContextType | null>(null);
export const LOCALSTORAGEMUSCLES = LOCALSTORAGEPRESET + "muscle-list";


export const MuscleProvider = ({ children }: Props) => {
    const [muscles, setMuscles] = useLocalStorage<Muscel[]>(LOCALSTORAGEMUSCLES, []);
    const auth = useAuth()!;

    async function addMuscle(newMucel: NewMuscel) {
        return await axios.post(MUSCLEURI, {
            params: { name: newMucel.name }
        },
            {
                headers: { 'authorization': 'Bearer ' + auth.token }
            }).then(response => {
                setMuscles([...muscles, response.data]);
            }).catch(err => {
                return err.response;
            });
    }

    async function removeMuscle(muc: Muscel) {
        return await axios.delete(MUSCLEURI + "/" + muc._id,
            {
                headers: { 'authorization': 'Bearer ' + auth.token }
            }).then(response => {
                setMuscles(muscles.filter((muscel: Muscel) => muscel._id != response.data._id));
            }).catch(err => {
                return err.response;
            });
    }

    function sync() {
        axios.get(MUSCLEURI,
            {
                headers: { 'authorization': 'Bearer ' + auth.token }
            }).then(response => {
                setMuscles(response.data);
            });
    }

    return (
        <MuscleContext.Provider value={{ muscles, addMuscle, removeMuscle, sync }}>
            {children}
        </MuscleContext.Provider>
    )
}

export const useMuscle = () => {
    return useContext(MuscleContext);
}