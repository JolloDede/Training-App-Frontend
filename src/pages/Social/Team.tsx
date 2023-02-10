import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";

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
        <div className="p-2 border rounded-lg">
            <div onClick={() => handleTeamClick(teamId)} className="flex">
                <div className="">+</div>
                <p className="flex content-center mx-auto">{teamId}</p>
            </div>
            {members.map(member => (
                <div key={member._id} className="ml-4 p-2 border rounded-lg">
                    <p>{member.username}</p>
                </div>
            ))}
        </div>
    );
}

export default Team;