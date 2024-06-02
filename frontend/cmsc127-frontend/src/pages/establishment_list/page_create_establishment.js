import axios from 'axios';
import { useEffect, useState } from 'react';
import ENV from '../../env';
import { useLocation, useParams } from 'react-router-dom';
import FoodTable from '../components/food_table';

let SERVER = ENV.SERVER;
let HEADER = ENV.HEADER;
let user_id = sessionStorage.getItem("user_id");

function CreateEstablishment() {

    const [establishmentName, setEstablishmentName] = useState("");
    const [establishmentLocation, setEestablishmentLocation] = useState("");
    const [operatingHours, setOperatingHours] = useState("");


    async function handleOnSubmit(event) {
        event.preventDefault();
        console.log(establishmentName, establishmentLocation, operatingHours);

        try {
            let request_body = {
                "establishment_name": establishmentName,
                "establishment_location": establishmentLocation,
                "operating_hours": operatingHours,
                "established_by": parseInt(user_id)
            };

            console.log(request_body);

            let createEstablishment_result = await axios.post(
                `http://${SERVER}/api/create-establishment`,
                request_body
            )
        } catch (err) {
            console.log(["There was an error:", err]);
        }
    }

    function handleOnChange(event, setFunction) {
        setFunction(event.target.value);
    }

    return(
    <div className='container'>
    <form onSubmit={(e) => handleOnSubmit(e)}>
        <label> Establishment Name:
            <input type="text" onChange={(e) => handleOnChange(e, setEstablishmentName)}></input>
        </label>
        <label> Establishment Location:
            <input type="text" onChange={(e) => handleOnChange(e, setEestablishmentLocation)}></input>
        </label>
        <label> Operating Hours:
            <input type="text" onChange={(e) => handleOnChange(e, setOperatingHours)}></input>
        </label>
        <button type="submit">Create Establishment</button>
    </form>
    </div>
    )
}

export default CreateEstablishment;