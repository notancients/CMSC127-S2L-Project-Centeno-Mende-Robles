import React, { useState, useContext } from 'react';
import style from '../../styles/style_landing.css'; // Import the CSS stylesheet
import { useNavigate } from 'react-router-dom';
import LogoutButton from './logout_button';
import { LoginContext } from '../../react_provider';
import BackButton from './back_button';
import LandingAppBar from './landing_appbar';

let first_name = sessionStorage.getItem("first_name");

function AppBar() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(true);
    const { isLoggedIn, login, logout } = useContext(LoginContext);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    async function handlePageTransfer(target) {

        console.log(`Navigating to: ${target}`);
        navigate(target);
    }

    let target_pages = {
        "Create Review" : "/create-review",
        "View All Establishments" : "/view-all-establishments",
        "Your Establishment": "/update-establishment",
        "Your Food Items": "/update-food",
        "Your Reviews": "/your-reviews"
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
            <nav className={`app-bar-nav ${showMenu ? 'active' : ''}`}>
                {Object.keys(target_pages).map((element) => {
                    return <div key={element} onClick={(e) => handlePageTransfer(target_pages[element])}>{element}</div>
                })}
            </nav>
            <button>Search</button>
            <LogoutButton/>
        </div>
    )
    }
    {
    !isLoggedIn && (
        <LandingAppBar/>
    )
    }
    </>
    );
}

export default AppBar;
