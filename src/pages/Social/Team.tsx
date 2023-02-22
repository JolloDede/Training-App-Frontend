import { MouseEvent, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";

interface Props {
    teamId: number;
}

interface FetchedUser {
    _id: string;
    username: string;
}

function Team({ teamId }: Props) {
    const [members, setMembers] = useState<FetchedUser[]>([]);
    const auth = useAuth();
    const navigate = useNavigate();

    function handleTeamClick(teamId: number) {
        if (members.length != 0) { setMembers([]); return; }
        axios.get<FetchedUser[]>("teams/" + teamId, {
            headers: { 'Authorization': 'Bearer ' + auth?.token }
        })
            .then(response => {
                setMembers(response.data)
            })
    }

    function handleUserClick(e: MouseEvent, userId: string) {
        e.stopPropagation();
        navigate(userId);
    }

    return (
        <Card classname="flex-col">
            <div onClick={() => handleTeamClick(teamId)} className="flex w-full mb-2">
                <div className="flex select-none">+</div>
                <p className="flex justify-center mx-auto cursor-default">{teamId}</p>
            </div>
            {members.map(member => (
                <div key={member._id} onClick={(e) => handleUserClick(e, member._id)} className="ml-4 my-1 p-2 border rounded-lg w-11/12 hover:bg-blue-50">
                    {member.username == auth?.user.name ? 
                    <p className="text-blue-400">You</p> :
                    <p>{member.username}</p>}
                </div>
            ))}
        </Card>
    );
}

export default Team;