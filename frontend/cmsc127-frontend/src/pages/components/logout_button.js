
import { useContext } from 'react';
import {MdExitToApp as Exit} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../react_provider';

function LogoutButton() {
    const navigate = useNavigate();
    const { isLoggedIn, login, logout } = useContext(LoginContext);

    function handleLogout() {
        alert("You have been logged out.");
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("first_name");
        sessionStorage.removeItem("last_name");
        
        logout();
        navigate("/");
    }

    return (
    <Exit onClick={handleLogout}/>
    )
}

export default LogoutButton;