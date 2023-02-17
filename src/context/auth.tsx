import axios from 'axios';
import { createContext, useContext, useEffect } from 'react'
import { LOGINURI } from '../assets/config';
import useLocalStorage from '../utils/useLocalStorage';

interface AuthContextType {
    user: User;
    login: Function;
    logout: Function;
    children?: React.ReactNode;
    token: string;
}

interface Props {
    children?: React.ReactNode;
}

export enum Group {
    Admin,
    User
}

interface User {
    _id: string;
    name: string;
    group: Group;
    team: number[];
}

interface UserResponse {
    user: {
        name: string;
        group: number;
        team: number[];
    }
    token: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useLocalStorage("user");

    useEffect(() => {
        if (user) {
            axios.get("", {
                headers: { 'authorization': 'Bearer ' + user.token }
            })
                .catch(() => {
                    setUser("");
                })
        }
    }, [])

    const login = async (user: string, password: string) => {
        return await axios.post<UserResponse>(LOGINURI, {
            params: {
                username: user,
                password
            }
        })
            .then(response => {
                const data = response.data;
                setUser({ name: data.user.name, group: data.user.group, team: data.user.team, token: data.token });
                return 200;
            })
            .catch(response => {
                return response.status;
            })
    }

    const logout = () => {
        setUser("");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, token: user.token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}