import { useState } from 'react'
import { Link } from 'react-router-dom'

export enum ActivePage {
    Home,
    Profile
}

interface Props {
    activePage: ActivePage
}

function Navbar({ activePage }: Props) {
    let tabsClassname = "bg-white text-blue-500 hover:text-blue-800 px-4 py-2 mr-2";
    let activeTabClassname = " border-l border-t border-r rounded-t -mb-px";
    let homeClassname = activePage == ActivePage.Home ? tabsClassname + activeTabClassname : tabsClassname;
    let profileClassname = activePage == ActivePage.Profile ? tabsClassname + activeTabClassname : tabsClassname

    return (
        <nav className='flex py-6'>
            <div className='flex w-full border-b'>
                <Link to={"/"} className={homeClassname}>
                    Home
                </Link>
                <Link to={"/profile"} className={profileClassname}>
                    Profile
                </Link>
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