import React, { useState } from 'react';
import style from '../../styles/style_landing.css'; // Import the CSS stylesheet

function LandingAppBar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="app-bar">
      <div className="app-bar-title">My App Title</div>
      <nav className={`app-bar-nav ${showMenu ? 'active' : ''}`}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
      <button className="menu-button" onClick={toggleMenu}>
        <i className="fas fa-bars"></i> {/* Font Awesome icon for menu */}
      </button>
    </div>
  );
}

export default LandingAppBar;
