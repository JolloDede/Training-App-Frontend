import Navbar, { ActivePage } from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";

function Social() {
    return (
        <>
            <Navbar activePage={ActivePage.Social} />
            <PageTitle>Social</PageTitle>
        </>
    );
}

export default Social;