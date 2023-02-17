import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Card from "../../components/Card";

interface Props {
    teamId: number;
}

interface FetchedUser {
    _id: number;
    username: string;
}

function Team({ teamId }: Props) {
    const [members, setMembers] = useState<FetchedUser[]>([]);
    const auth = useAuth();

    function handleTeamClick(teamId: number) {
        if (members.length != 0) { setMembers([]); return; }
        axios.get<FetchedUser[]>("teams/" + teamId, {
            headers: { 'Authorization': 'Bearer ' + auth?.token }
        })
            .then(response => {
                setMembers(response.data)
            })
    }

    return (
        <Card classname="flex-col">
            <div onClick={() => handleTeamClick(teamId)} className="flex w-full mb-2">
                <div className="flex">+</div>
                <p className="flex justify-center mx-auto">{teamId}</p>
            </div>
            {members.map(member => (
                <div key={member._id} className="ml-4 my-1 p-2 border rounded-lg w-11/12">
                    {member.username == auth?.user.name ? 
                    <p className="text-blue-400">You</p> :
                    <p>{member.username}</p>}
                </div>
            ))}
        </Card>
    );
}

export default Team;