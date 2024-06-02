import React, { useState, useEffect, useMemo } from "react";
import ENV from "../../env.js";
import axios from 'axios';
import { useTable } from "react-table";
import HomePageAppBar from "../homepage/homepage_appbar.js";
import { useNavigate } from "react-router-dom";

let SERVER = ENV.SERVER;
let HEADER = ENV.HEADER;




function EstablishmentList() {
    const navigate = useNavigate();

    async function handleViewFood(name) {
        console.log(`Navigating to: ${name}`);
        navigate(`/food-by-establishment/${name}`);
    }

    function EstablishmentTable({headers, data}) {
        return(
        <table>
            <thead>
                <tr>
                {headers.map( (element) => {
                    return <th key={`${element}-header`}>{element}</th>
                })}
                </tr>
            </thead>
            <tbody>
                {data.map( (item) => {
                    return <tr key={`${item.establishment_id}${item.establishment_name}`}>
                        <td>{item.establishment_id}</td>
                        <td>{item.establishment_name}</td>
                        <td>{item.establishment_location}</td>
                        <td>{item.operating_hours}</td>
                        <td><button onClick={() => handleViewFood(item.establishment_name)}>View Food</button></td>
                    </tr>
                } )}
            </tbody>
        </table>
        )
    }

    let [establishment, setEstablishment] = useState([]);

    useEffect( () => {
        console.log("Fetching establishments data.");
        const fetchEstablishments = async () => {
            try {
                const response = await axios.get(
                    `http://${SERVER}/api/view-all-establishment`
                );
                setEstablishment(response.data.data[0]);
            } catch (err) {
                console.log(err);
            }
        }

        fetchEstablishments();
    }, []);


    let headers = ['ID', 'Name', 'Location', 'Hours', 'Food', 'Reviews'];

    return (
    <>
    <HomePageAppBar/>
    <div className="container">
        <EstablishmentTable headers={headers} data={establishment}/>
    </div>
    </>
    )
}

export default EstablishmentList;