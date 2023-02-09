import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Group, useAuth } from '../context/auth';

export enum ActivePage {
    Home,
    Profile,
    Admin,
    Social
}

interface Props {
    activePage: ActivePage
}

function Navbar({ activePage }: Props) {
    let tabsClassname = "bg-white text-blue-500 hover:text-blue-800 px-4 py-2 mr-2";
    let activeTabClassname = " border-l border-t border-r rounded-t -mb-px";
    let homeClassname = activePage == ActivePage.Home ? tabsClassname + activeTabClassname : tabsClassname;
    let profileClassname = activePage == ActivePage.Profile ? tabsClassname + activeTabClassname : tabsClassname;
    let AdminClassname = activePage == ActivePage.Admin ? tabsClassname + activeTabClassname : tabsClassname;
    let socialClassname = activePage == ActivePage.Social ? tabsClassname + activeTabClassname : tabsClassname;
    const auth = useAuth();


    return (
        <nav className='flex py-6'>
            <div className='flex w-full border-b'>
                <Link to={"/"} className={homeClassname}>
                    Home
                </Link>
                <Link to={"/profile"} className={profileClassname}>
                    Profile
                </Link>
                <Link to={"/social"} className={socialClassname}>
                    Social
                </Link>
                {auth?.user.group == Group.Admin ? <Link to={"/admin"} className={AdminClassname} >Admin</Link> : ""}
            </div>
            <div className='flex self-end'>
                <Link to={"/login"} className="bg-white text-blue-500 hover:text-blue-800 px-4 py-2 mx-2 border rounded">
                    Login
                </Link>
            </div>
        </nav>
    )
}

export default Navbar