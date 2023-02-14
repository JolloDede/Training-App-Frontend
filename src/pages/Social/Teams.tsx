import { useAuth } from "../../context/auth";
import Team from "./Team";

function Teams() {
    const auth = useAuth();

    return (
        <div>
            {auth?.user.team.map(teamId => (
                <Team key={teamId} teamId={teamId} />
            ))}
        </div>
    );
}

export default Teams;