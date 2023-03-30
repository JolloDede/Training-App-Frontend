import axios, { AxiosResponse } from 'axios';
import { createContext, useContext } from 'react'
import useLocalStorage from 'usehooks-ts/dist/esm/useLocalStorage/useLocalStorage';
import { EXERCISEURI, LOCALSTORAGEPRESET } from '../assets/config';
import { useAuth } from './auth';
import { LOCALSTORAGEMUSCLES, Muscel, MuscleUsage, useMuscle } from './muscle';

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

type MuscleUSageResponse = {
    muscleId: string;
    percent: number;
}

interface ExerciseContextType {
    exercises: Exercise[];
    addExercise: (newExercise: NewExercise) => Promise<AxiosResponse>;
    removeExercise: (exercise: Exercise) => Promise<AxiosResponse>;
    edit: (exercise: Exercise) => Promise<AxiosResponse>;
    sync: () => void;
}

const ExerciseContext = createContext<ExerciseContextType | null>(null);
export const LOCALSTORAGEEXERCISES = LOCALSTORAGEPRESET + "exercise-list";

export const ExerciseProvider = ({ children }: Props) => {
    const [exercises, setExercises] = useLocalStorage<Exercise[]>(LOCALSTORAGEEXERCISES, []);
    const auth = useAuth()!;

    function muscleFactory(muscleUsages: MuscleUSageResponse[]): MuscleUsage[] {
        let muscles: Muscel[] = JSON.parse(localStorage.getItem(LOCALSTORAGEMUSCLES)!);
        let result = muscleUsages.map(muscleUsage => {
            return { muscle: muscles.find(muscle => muscle._id == muscleUsage.muscleId)!, percent: muscleUsage.percent };
        });
        return result;
    }

    async function addExercise(newExercise: NewExercise) {
        return await axios.post(EXERCISEURI, {
            params: {
                name: newExercise.name,
                muscles: newExercise.muscles.map(musclUsage => ({ muscleId: musclUsage.muscle._id, percent: musclUsage.percent })),
            }
        },
            {
                headers: { 'authorization': 'Bearer ' + auth.token }
            }).then(response => {
                let newExercise: Exercise = {
                    _id: response.data._id,
                    name: response.data.name,
                    muscles: muscleFactory(response.data.muscles),
                };
                setExercises([...exercises, newExercise]);
            }).catch(err => {
                return err.response;
            })
    }

    async function removeExercise(ex: Exercise) {
        return await axios.delete(EXERCISEURI + "/" + ex._id,
            {
                headers: { 'authorization': 'Bearer ' + auth.token }
            }).then(response => {
                setExercises(exercises.filter((exercise: Exercise) => exercise._id != response.data._id));
            }).catch(err => {
                return err.response;
            })
    }

    async function edit(exercise: Exercise) {
        const params = {
            _id: exercise._id,
            name: exercise.name,
            muscles: exercise.muscles.map(musclUsage => ({ muscleId: musclUsage.muscle._id, percent: musclUsage.percent })),
        };
        return await axios.put(EXERCISEURI, {
            params,
        },{
            headers: { 'authorization': 'Bearer ' + auth.token }
        }).then(response => {
            setExercises(exercises.map(exercise => {
                if (exercise._id == response.data._id) {
                    const updatedExercise: Exercise = {
                        _id: response.data._id,
                        name: response.data.name,
                        muscles: muscleFactory(response.data.muscles),
                    }
                    return updatedExercise;
                }else {
                    return exercise;
                }
            }))
        }).catch(err => {
            return err.response;
        })
    }

    function sync() {
        axios.get(EXERCISEURI,
            {
                headers: { 'authorization': 'Bearer ' + auth.token }
            }).then(response => {
                setExercises(response.data.map((exerciseRes: any) => ({ _id: exerciseRes._id, name: exerciseRes.name, muscles: muscleFactory(exerciseRes.muscles) })));
            });
    }

    return (
        <ExerciseContext.Provider value={{ exercises, addExercise, removeExercise, edit, sync }}>
            {children}
        </ExerciseContext.Provider>
    )
}

export const useExercise = () => {
    return useContext(ExerciseContext);
}