import { MouseEventHandler, useState } from "react";
import Navbar, { ActivePage } from "../../components/Navbar";
import ExerciseSummary from "./ExerciseSummary";
import ExerciseList from "./ExerciseList";
import { Exercise, ExerciseProvider, useExerciseArr } from "../../context/exercise";
import { Route, Routes, useNavigate, useNavigation } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import HLink from "../../components/Link";

enum ActiveContent {
    ExerciseList,
    GroupMebers,
    Exercise
}

function Admin() {
    const [activeContent, setActiveContent] = useState<ActiveContent>(ActiveContent.ExerciseList);
    const navigate = useNavigate();

    return (
        <div>
            <Navbar activePage={ActivePage.Admin} />
            <PageTitle>Admin</PageTitle>
            <HLink to="exercises">Exercises</HLink>
            <ExerciseProvider>
                <Routes>
                    <Route index path="/exercises" element={<ExerciseList />} />
                    <Route path="/exercises/:id" element={<ExerciseSummary />} />
                </Routes>
            </ExerciseProvider>
        </div>
    );
}

export default Admin;