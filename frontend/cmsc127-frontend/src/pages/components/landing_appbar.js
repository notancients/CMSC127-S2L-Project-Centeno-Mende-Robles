import React, { useState } from 'react';
import style from '../../styles/style_landing.css'; // Import the CSS stylesheet

function LandingAppBar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="app-bar">
      <div className="app-bar-title">Reviews</div>
    </div>
  );
}

export default LandingAppBar;
