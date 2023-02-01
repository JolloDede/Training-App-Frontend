import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Navbar, { ActivePage } from '../../components/Navbar';
import PageTitle from '../../components/PageTitle';
import { useAuth } from '../../context/auth'


function Profile() {
    const auth = useAuth()!;
    const navigate = useNavigate();

    function onClickhandler() {
        auth.logout();
        navigate("/login");
    }

    return (
        <>
            <Navbar activePage={ActivePage.Profile} />
            <PageTitle>This is the Profile page.</PageTitle>
            <p>Welcome {auth?.user.name}</p>
            <Button onCLick={onClickhandler}>Logout</Button>
        </>
    )
}

export default Profile
