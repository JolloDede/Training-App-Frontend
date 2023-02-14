import { MouseEventHandler, useState } from "react";
import Navbar, { ActivePage } from "../../components/Navbar";
import ExerciseSummary from "./ExerciseSummary";
import ExerciseList from "./ExerciseList";
import { Exercise, ExerciseProvider, useExercise } from "../../context/exercise";
import { Route, Routes, useNavigate, useNavigation } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import HLink from "../../components/Link";
import NewExercise from "./NewExercise";
import MuscleList from "./MuscleList";
import NewMuscle from "./NewMuscle";
import { MuscleProvider } from "../../context/muscle";

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
            <MuscleProvider>
                <ExerciseProvider>
                    <Routes>
                        <Route index path="/exercises" element={<ExerciseList />} />
                        <Route path="/exercises/:id" element={<ExerciseSummary />} />
                        <Route path="/exercises/new" element={<NewExercise />} />
                        <Route path="/muscles" element={<MuscleList />} />
                        <Route path="/muscles/new" element={<NewMuscle />} />
                    </Routes>
                </ExerciseProvider>
            </MuscleProvider>
        </div>
    );
}

export default Admin;