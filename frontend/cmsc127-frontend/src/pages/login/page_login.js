import { useState } from "react";
import axios from "axios";
import ENV from "../../env.js";
import { useNavigate } from "react-router-dom";

let SERVER = ENV.SERVER;
let HEADER = ENV.HEADER;


function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            let api_address = `http://${SERVER}/api/login`;
            let request_body = {
                "username": username,
                "user_password": password
            };

            let login_response = await axios.post(
                api_address,
                request_body,
                HEADER
            );

            let response_data = login_response.data;

            if(!response_data.success) {
                console.log(login_response); 
                setPassword('');
                alert(`${response_data.message}`);
            } else {
                console.log("Successfully logged in.");
                // console.log(response_data);
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("user_type", response_data.data.user_type);
                sessionStorage.setItem("user_id", response_data.data.user_id);
                sessionStorage.setItem("first_name", response_data.data.first_name);
                navigate("/homepage")
            }
        } catch (err) {

        }
    }

    const inputChange = (event, setFunction) => {
        setFunction(event.target.value);
        // console.log(username, password);
    }

    return (
        <div className="container flex column main-axis-center cross-axis-center">
            <form onSubmit={handleSubmit}>
                <label> Username: <input type="text" onChange={(e)=> inputChange(e, setUsername)}></input> </label>
                <label> Password: <input type="password" onChange={(e)=> inputChange(e, setPassword)}></input> </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;