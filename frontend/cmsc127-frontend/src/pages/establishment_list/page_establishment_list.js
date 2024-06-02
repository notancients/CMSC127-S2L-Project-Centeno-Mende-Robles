import React, { useState, useEffect, useMemo } from "react";
import ENV from "../../env.js";
import axios, { all } from 'axios';
import { useTable } from "react-table";
import HomePageAppBar from "../homepage/homepage_appbar.js";
import { Link, useNavigate } from "react-router-dom";
import EstablishmentTable from "../components/establishment_table.js";

let SERVER = ENV.SERVER;
let HEADER = ENV.HEADER;

const order_options = ["All", "Highly Rated (Ascending)", "Highly Rated (Descending)"]


function EstablishmentList() {
    const navigate = useNavigate();

    
    let [allEstablishment, setAllEstablishment] = useState([]);
    let [establishment, setEstablishment] = useState([]);
    const [isOpen, setIsOpen] = useState(false);



    useEffect( () => {
        console.log("Fetching establishments data.");
        const fetchEstablishments = async () => {
            try {
                const response = await axios.get(
                    `http://${SERVER}/api/view-all-establishment`
                );
                setAllEstablishment(response.data.data[0]);
                setEstablishment(response.data.data[0]);
            } catch (err) {
                console.log(err);
            }
        }

        fetchEstablishments();
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    function handleHighlyRated(establishmentFilter) {
        let newEstablishmentArray = [];

        if (establishmentFilter === "All") {
            newEstablishmentArray = allEstablishment;
        } else {
            allEstablishment.map( (element) => {
                if(parseFloat(element.rating) >= 4) {
                    newEstablishmentArray.push(element);
                };
            } )

            newEstablishmentArray.sort( (a, b) => establishmentFilter == "High-Asc" ? b.rating - a.rating : a.rating - b.rating);
        }

        setEstablishment(newEstablishmentArray);
        setIsOpen(false);
    }

    function EstablishmentDropdown() {
        return(
        <div className="dropdown">
            <button onClick={toggleDropdown}>Order by range</button>
            {isOpen && (
            <ul className="dropdown-menu">
                {order_options.map((option) => (
                <li key={`rating_${option}`} onClick={() => handleHighlyRated(option)}>
                    {option}
                </li>
                ))}
            </ul>
            )}
        </div>
        )
    }

    return (
    <>
    <HomePageAppBar/>
    <div className="container">
        <EstablishmentDropdown/>
        <EstablishmentTable data={establishment}/>
    </div>
    </>
    )
}

export default EstablishmentList;