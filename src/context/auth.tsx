import { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../utils/useLocalStorage';

interface AuthContextType {
    user: User;
    login: Function;
    logout: Function;
    children?: React.ReactNode;
}

interface Props {
    children?: React.ReactNode;
}

export enum Group {
    Admin,
    User
}

interface User {
    name: string;
    group: Group;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useLocalStorage("user");

    const login = (user: string) => {
        setUser({ name: user, group: Group.Admin });
    }

    const logout = () => {
        setUser("");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}