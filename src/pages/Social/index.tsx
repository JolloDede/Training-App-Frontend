import { Route, Routes } from "react-router-dom";
import Navbar, { ActivePage } from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";
import { useAuth } from "../../context/auth";
import Teams from "./Teams";

function Social() {
    const auth = useAuth();

    return (
        <>
            <Navbar activePage={ActivePage.Social} />
            <PageTitle>Social</PageTitle>
            <Routes>
                <Route path="/" element={<Teams />} />
                {/* Todo add exercises to other users */}
                <Route path="/:id" element={<Teams />} />
            </Routes>
        </>
    );
}

export default Social;