import React, { useState } from 'react';
import style from '../../styles/style_landing.css'; // Import the CSS stylesheet
import { useNavigate } from 'react-router-dom';

let first_name = sessionStorage.getItem("first_name");

function HomePageAppBar() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(true);

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
        "Update Establishment": "/update-establishment"
    }

    return (
        <div className="app-bar">
        <div className="app-bar-title">Welcome {first_name}!</div>
        <nav className={`app-bar-nav ${showMenu ? 'active' : ''}`}>
            {Object.keys(target_pages).map( (element) => {
                return <div key={element} onClick={(e) => handlePageTransfer(target_pages[element])}>{element}</div>
            })}
        </nav>
        <button className="" onClick={toggleMenu}>
            <i className="fas fa-bars">Open menu</i> {/* Font Awesome icon for menu */}
        </button>
        </div>
    );
    }

    export default HomePageAppBar;
