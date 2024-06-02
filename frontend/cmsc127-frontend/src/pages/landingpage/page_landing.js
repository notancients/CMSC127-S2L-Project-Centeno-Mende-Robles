import styles from '../../styles/style_landing.css';
import LandingAppBar from './landing_appbar';
import axios from 'axios';

import ENV from "../../env.js";

function LandingPage() {

    async function signUp() {
        console.log("Sign up button has been pressed.");
        let response = await axios.get(
            `http://${ENV.SERVER}/`
        );
        console.log(response);
    }

    async function logIn() {
        console.log("Log in button has been pressed.");
    }

    return (
        <div className="container">
            <LandingAppBar/>
            <div className="flex main-axis-center">Welcome to Reviews!</div>
            <div className='flex main-axis-center cross-axis-center'>
                <button onClick={signUp}>Sign Up</button>
                <button onClick={logIn}>Log In</button>
            </div>
        </div>
    )
}

export default LandingPage;