import styles from '../../styles/style.css';
import axios from 'axios';

import ENV from "../../env.js";
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    async function signUp() {
        console.log("Sign up button has been pressed.");
        
    }

    async function logIn() {
        console.log("Log in button has been pressed.");

        navigate("/login");
    }

    return (
        <div className="container">
            <div id='container-body'>
                <div className="flex main-axis-center">Welcome to Reviews!</div>
                <div className='flex main-axis-center cross-axis-center'>
                    <button onClick={signUp}>Sign Up</button>
                    <button onClick={logIn}>Log In</button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;