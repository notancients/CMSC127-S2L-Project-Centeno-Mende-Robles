import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ENV from '../../env';
import { useLocation, useParams } from 'react-router-dom';
import Modal from '../components/Modal';

let SERVER = ENV.SERVER;
let HEADER = ENV.HEADER;
let user_id = sessionStorage.getItem("user_id");

let headers = ['ID', 'Name', 'Location', 'Hours', 'Food', 'Reviews'];

function UpdateForm({toggleModal, renderTable, targetId}) {
    const [establishmentName, setEstablishmentName] = useState("");
    const [establishmentLocation, setEestablishmentLocation] = useState("");
    const [operatingHours, setOperatingHours] = useState("");
    

    async function handleOnSubmit(event) {
        event.preventDefault();
        console.log(establishmentName, establishmentLocation, operatingHours);

        try {
            let request_body = {
                "establishment_id": targetId,
                "establishment_name": establishmentName,
                "establishment_location": establishmentLocation,
                "operating_hours": operatingHours
            };

            // console.log(request_body);

            let response = await axios.patch(
                `http://${SERVER}/api/update-establishment`,
                request_body,
                HEADER
            )
            
            

            if(response.data.success) {
                renderTable();
                toggleModal();
                alert("Succesfully updated establishment");
            }
        } catch (err) {
            console.log(["There was an error:", err]);
        }
    }

    function handleOnChange(event, setFunction) {
        setFunction(event.target.value);
    }

    return(
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
        <button type="submit">Search</button>
    </form>
    )
}

function UpdateTable({data, renderTable}) {
    const [open, setModal] = React.useState(false);
    const [targetId, setTargetId] = useState(null);

    function toggleModal(targetId) {
        setTargetId(targetId);
        setModal(!open);
    }


    return(
    <>
    <table>
        <thead>
            <tr>
                {headers.map((element) => {
                    return <th key={`${element}-header`}>{element}</th>
                })}
            </tr>
        </thead>
        <tbody>
            {data.map((item) => {
                return <tr key={`${item.establishment_id}${item.establishment_name}`}>
                    <td>{item.establishment_id}</td>
                    <td>{item.establishment_name}</td>
                    <td>{item.establishment_location}</td>
                    <td>{item.operating_hours}</td>
                    <td>
                    <button type="button" onClick={() => {toggleModal(item.establishment_id)}}>
                        Click Me to Open Modal
                    </button>
                    </td>
                </tr>
            })}
        </tbody>
    </table>
    <Modal isOpen={open} onClose={setModal}>
        <>
        <UpdateForm renderTable={renderTable} targetId={targetId} toggleModal={() => toggleModal()}/>
        <button onClick={toggleModal}>X</button>
        </>
    </Modal>
    </>
    );
}

function UpdateEstablishment() {

    const [establishment, setEstablishment] = useState([]);
    const [allEstablishment, setAllEstablishment] = useState([]);

    const fetchEstablishments = async () => {
        try {
            const response = await axios.get(
                `http://${SERVER}/api/get-establishment-by-user-id?user_id=${user_id}`
            );
            setAllEstablishment(response.data.data);
            setEstablishment(response.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect( () => {
        console.log("Fetching establishments data.");

        fetchEstablishments();
    }, []);

    return(
    <div className='container'>
    
    <UpdateTable data={establishment} renderTable={() => {fetchEstablishments()}}/>
    </div>
    )
}

export default UpdateEstablishment;