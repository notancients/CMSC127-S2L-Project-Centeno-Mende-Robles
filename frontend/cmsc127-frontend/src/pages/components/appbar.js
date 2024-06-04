import React, { useState, useContext } from 'react';
import style from '../../styles/style_landing.css'; // Import the CSS stylesheet
import { useNavigate } from 'react-router-dom';
import LogoutButton from './logout_button';
import { LoginContext } from '../../react_provider';
import BackButton from './back_button';
let first_name = sessionStorage.getItem("first_name");

function AppBar() {
    const navigate = useNavigate();
    const { isLoggedIn, login, logout } = useContext(LoginContext);


    async function handlePageTransfer(target) {

        console.log(`Navigating to: ${target}`);
        navigate(target);
    }

    let target_pages = {
        "Create": "/create",
        "View All Establishments" : "/view-all-establishments",
        "Your Establishment": "/update-establishment",
        "Your Food Items": "/update-food",
        "Your Reviews": "/your-reviews",
        "Search": "/search"
    }
    

    return (
    <>
    {
    isLoggedIn && (
        <div className="app-bar">
            <div className='flex row'>
                <BackButton/>
                <div className="app-bar-title">Welcome {first_name}!</div>
            </div>
            <nav className='app-bar-nav'>
                {Object.keys(target_pages).map((element) => {
                    return <div key={element} onClick={(e) => handlePageTransfer(target_pages[element])}>{element}</div>
                })}
            </nav>
            <LogoutButton/>
        </div>
    )
    }
    {
    !isLoggedIn && (
        <div className="app-bar">
            <div className='flex row'>
                <div className="app-bar-title" onClick={()=>navigate('/')}>Review App</div>
            </div>
        </div>
    )
    }
    </>
    );
}

export default AppBar;
