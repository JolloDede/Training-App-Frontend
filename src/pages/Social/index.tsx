import Navbar, { ActivePage } from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";
import { useAuth } from "../../context/auth";
import Team from "./Team";

function Social() {
    const auth = useAuth();

    return (
        <>
            <Navbar activePage={ActivePage.Social} />
            <PageTitle>Social</PageTitle>
            <div>
                {auth?.user.team.map(teamId => (
                    <Team key={teamId} teamId={teamId} />
                ))}
            </div>
        </>
    );
}

export default Social;