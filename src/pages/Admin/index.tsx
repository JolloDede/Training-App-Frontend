import Navbar, { ActivePage } from "../../components/Navbar";
import ExerciseSummary from "./ExerciseSummary";
import ExerciseList from "./ExerciseList";
import { Route, Routes } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import HLink from "../../components/Link";
import NewExercise from "./NewExercise";
import MuscleList from "./MuscleList";
import NewMuscle from "./NewMuscle";

function Admin() {

    return (
        <div>
            <Navbar activePage={ActivePage.Admin} />
            <PageTitle>Admin</PageTitle>
            <div className="flex">
                <div className="flex mx-2">
                    <HLink to="exercises">Exercises</HLink>
                </div>
                <div className="flex mx-2">
                    <HLink to="muscles">Muscles</HLink>
                </div>
            </div>
            <Routes>
                <Route index path="/exercises" element={<ExerciseList />} />
                <Route path="/exercises/:id" element={<ExerciseSummary />} />
                <Route path="/exercises/new" element={<NewExercise />} />
                <Route path="/muscles" element={<MuscleList />} />
                <Route path="/muscles/new" element={<NewMuscle />} />
            </Routes>
        </div>
    );
}

export default Admin;