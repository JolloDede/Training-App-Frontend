import { Route, Routes } from "react-router-dom";
import Navbar, { ActivePage } from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";
import { useAuth } from "../../context/auth";
import { ExerciseProvider } from "../../context/exercise";
import { WorkoutProvider } from "../../context/workout";
import AdminRoutes from "../../utils/AdminRoutes";
import NewWorkout from "../Profile/NewWorkout";
import Teams from "./Teams";
import User from "./User";

function Social() {
    const auth = useAuth();

    return (
        <>
            <Navbar activePage={ActivePage.Social} />
            <PageTitle>Social</PageTitle>
            <Routes>
                <Route path="/" element={<Teams />} />
                {/* Todo add exercises to other users */}
                <Route element={<AdminRoutes />}>
                    <Route path="/:id" element={<User />} />
                    <Route path="/:id/newworkout" element={<NewWorkout />} />
                </Route>
            </Routes>
        </>
    );
}

export default Social;