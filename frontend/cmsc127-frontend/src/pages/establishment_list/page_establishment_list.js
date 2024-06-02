import React, { useState, useEffect, useMemo } from "react";
import ENV from "../../env.js";
import axios from 'axios';
import { useTable } from "react-table";
import HomePageAppBar from "../homepage/homepage_appbar.js";
import { Link, useNavigate } from "react-router-dom";
import EstablishmentTable from "../components/establishment_table.js";

let SERVER = ENV.SERVER;
let HEADER = ENV.HEADER;




function EstablishmentList() {
    const navigate = useNavigate();

    

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



    return (
    <>
    <HomePageAppBar/>
    <div className="container">
        <EstablishmentTable data={establishment}/>
    </div>
    </>
    )
}

export default EstablishmentList;