import React, { useState, useEffect, useMemo } from "react";
import ENV from "../../env.js";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

let SERVER = ENV.SERVER;
let HEADER = ENV.HEADER;

let foodDetailTemplate = {
    "food_name": "",
    "price": 0.0, 
    "establishment_id": 0,
    "image_url": [],
    "ingredients": [],
    "category": []
}

let establishmentDetailTemplate = {
    "establishment_name": "", 
    "establishment_location": "", 
    "operating_hours": "", 
    "established_by": 0
}

let user_id = sessionStorage.getItem("user_id");

function Create() {
    const [createType, setCreateType] = useState("Establishment");


    const [foodName, setFoodName] = useState("");
    const [foodPrice, setFoodPrice] = useState(0.0);
    const [foodEstablishmentId, setFoodEstablishmentId] = useState(null);
    const [foodImage, setFoodImage] = useState([]);
    const [foodIngredients, setFoodIngredients] = useState([]);
    const [foodCategory, setFoodcCategory] = useState([]);
    
    const [userEstablishment, setUserEstablishment] = useState([]);

    const [establishmentName, setEstablishmentName] = useState("");
    const [establishmentLocation, setEstablishmentLocation] = useState("");
    const [establishmentHours, setEstablishmentHours] = useState("");

    const fetchEstablishments = async () => {
        try {
            const response = await axios.get(
                `http://${SERVER}/api/get-establishment-by-user-id?user_id=${user_id}`
            );
            setUserEstablishment(response.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log("Fetching establishments by the user.");

        fetchEstablishments();
    }, []);
    
    function handleTextChange(event, setFunction) {
        setFunction(event.target.value);
    }

    function handleSelectChange(event, setFunction) {
        console.log(event.target.value);
        setFunction(event.target.value);
    }
    
    function handleArrayChange(event, setFunction) {
        let text = event.target.value;
        text = text.split(',');

        setFunction(text);
    }

    async function handleFoodSubmit(event) {
        event.preventDefault();
        console.log("Creating new food.");

        try {
            let request_body = {
                "food_name": foodName,
                "price": foodPrice, 
                "establishment_id": foodEstablishmentId,
                "image_url": [],
                "ingredients": foodIngredients,
                "category": foodCategory
            };

            if (!foodName || !foodPrice || !foodEstablishmentId || !foodIngredients || !foodCategory) {
                alert("Error. Please reinput your details.");
                return;
            }

            console.log(request_body);

            let response = await axios.post(
                `http://${SERVER}/api/create-food`,
                request_body,
                HEADER
            )
            
            console.log(response);

            if(response.data.success) alert("Successfully created a food item.");
            else alert("There was an error creating a food item.");

            console.log(response);

            setFoodName("");
            setFoodPrice(0.0);
            setFoodEstablishmentId(null);
            setFoodIngredients([]);
            setFoodcCategory([]);

            event.target.reset();
        } catch (err) {
            console.log(["There was an error", err]);
        }
    }

    async function handleEstablishmentSubmit(event) {
        event.preventDefault();
        console.log("Creating new food.");

        try {
            let request_body = {
                "establishment_name": establishmentName, 
                "establishment_location": establishmentLocation, 
                "operating_hours": establishmentHours, 
                "established_by": user_id
            };

            console.log(request_body);

            let response = await axios.post(
                `http://${SERVER}/api/create-establishment`,
                request_body,
                HEADER
            )

            if(response.data.success) alert("Successfully created establishment.");
            else alert("There was an error creating an establishment.");

            console.log(response);

            setEstablishmentName("");
            setEstablishmentLocation("");
            setEstablishmentHours("");
        

        } catch (err) {
            console.log(["There was an error", err]);
        }
    }

    function createTargetForm() {
        if(createType == "Establishment") {
        return (
        <div className="create-form flex column">
        <form onSubmit={handleEstablishmentSubmit}>
            <label> Establishment Name: 
                <input type="text" onChange={(e) => handleTextChange(e, setEstablishmentName)} required></input>
            </label>
            <label> Establishment Location: 
                <input type="text" onChange={(e) => handleTextChange(e, setEstablishmentLocation)} required></input>
            </label>
            <label> Operating Hours: 
                <input type="text" onChange={(e) => handleTextChange(e, setEstablishmentHours)} required></input>
            </label>
            <button>Create Establishment</button>
        </form>
        </div>
        )
        } else if (userEstablishment.length!=0) {
        return(
        <div className="create-form flex column">
        <form onSubmit={handleFoodSubmit}>
            <label>
                <select value={foodEstablishmentId} onChange={(e)=> handleSelectChange(e, setFoodEstablishmentId)} required>
                    {
                    userEstablishment.map((option) => {
                        return(
                            <option value={option.establishment_id}>{option.establishment_name}</option>
                        );
                    })
                    }
                </select>
            </label>
            <label> Food Name: 
                <input type="text" onChange={(e) => handleTextChange(e, setFoodName)} required></input>
            </label>
            <label> Price: 
                <input type="number" step={0.1} onChange={(e) => handleTextChange(e, setFoodPrice)} required></input>
            </label>
            <label> Food ingredients: 
                <input type="text" onChange={(e) => handleArrayChange(e, setFoodIngredients)} placeholder="Ingredient 1, Ingredient 2, Ingredient 3, etc..." required></input>
            </label>
            <label> Food Category: 
                <input type="text" onChange={(e) => handleArrayChange(e, setFoodcCategory)} placeholder="Category 1, Category 2, Category 3, etc..." required></input>
            </label>
            <button>Create Food</button>
        </form>
        </div>
        )
        } else if (userEstablishment.length ==0) {
            return(
            <div>
                Sorry you cannot create a food item without an establishment.
            </div>
            )
        }
    }

    return (
    <>
    <div className="container column">
    <div className="create-body flex">
        <div className="flex row max-width-child space-evenly">
            <div onClick={() => setCreateType("Establishment")}>Establishment</div>
            <div onClick={() => setCreateType("Food")}>Food</div>
        </div>
    
    {createTargetForm()}

    </div>
    </div>
    </>
    )
}

export default Create;