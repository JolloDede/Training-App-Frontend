import axios from 'axios';
import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts';
import { LOCALSTORAGEPRESET, LOGINURI } from '../assets/config';

interface AuthContextType {
    user: User;
    login: (user: string, password: string) => Promise<number>;
    logout: () => void;
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

type User = {
    name: string;
    group: Group;
    team: number[];
}

type UserResponse = {
    user: {
        name: string;
        group: number;
        team: number[];
    }
    token: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const initialUser = { user: { name: "", group: 0, team: [0] }, token: "" };

export const AuthProvider = ({ children }: Props) => {
    const [userResponse, setUserResponse] = useLocalStorage<UserResponse>(LOCALSTORAGEPRESET+"user", initialUser);

    useEffect(() => {
        if (userResponse) {
            axios.get("", {
                headers: { 'authorization': 'Bearer ' + userResponse.token }
            })
                .catch(() => {
                    setUserResponse(initialUser);
                })
        }
    }, [])

    async function login(user: string, password: string) {
        return await axios.post<UserResponse>(LOGINURI, {
            params: {
                username: user,
                password
            }
        })
            .then(response => {
                const data = response.data;
                setUserResponse({ user: { name: data.user.name, group: data.user.group, team: data.user.team }, token: data.token });
                return 200;
            })
            .catch(response => {
                return response.status;
            })
    }

    function logout() {
        setUserResponse(initialUser);
    }

    return (
        <AuthContext.Provider value={{ user: userResponse.user, login, logout, token: userResponse.token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}