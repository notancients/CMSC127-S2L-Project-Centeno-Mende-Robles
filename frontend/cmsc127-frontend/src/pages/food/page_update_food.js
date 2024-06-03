import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ENV from '../../env';
import { useLocation, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import { MdDelete }from "react-icons/md";

let SERVER = ENV.SERVER;
let HEADER = ENV.HEADER;
let user_id = sessionStorage.getItem("user_id");


function UpdateForm({toggleModal, renderTable, targetId}) {
    const [foodName, setFoodName] = useState("");
    const [price, setPrice] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [category, setCategory] = useState([]);

    const [ingredientIsOpen, setIngredientsIsOpen] = useState(false);
    const [categoryIsOpen, setCategoryIsOpen] = useState(false);
    
    const INGREDIENT_OPTIONS = ["Beef", "Chicken", "Egg", "Fish", "Flour", "Garlic", "Lobster", "Onion", "Shrimp", "Pepper", "Pork", "Vinegar", "Cornstarch", "Ginger", "Soy Sauce", "Salt"  ];
    const CATEGORY_OPTIONS = ["Filipino","Greek","Western","Asian","Japanese","Turkish","Vietnamese","Chinese","Fusion","Thai","Russian","Korean"];

    async function handleOnSubmit(event) {
        event.preventDefault();

        try {
            let request_body = {
                "food_id": targetId,
                "price": price,
                "ingredients": ingredients,
                "category": category
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

    const toggleIngredientDropdown = () => {setIngredientsIsOpen(!ingredientIsOpen)};
    const toggleCategoryDropdown = () => {setCategoryIsOpen(!categoryIsOpen)};

    function handleIngredientChange(option) {
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

    function handleCategoryChange(option) {
        
        let inArrayflag = false;
        for(let i=0; i<category.length; i++) {
            if(category[i] == option) {
                category.splice(i, i);
                inArrayflag = true;
                break;
            }
        }

        if(!inArrayflag) category.push(option);

        setCategory(category);
        setCategoryIsOpen(false);
    }

    function FoodUpdateDropdown({data, dropdownLabel, toggleDropdown, handleDropdownChange}) {
        return(
        <div className="dropdown">
            <button onClick={toggleDropdown}>{dropdownLabel}</button>
            {isOpen && (
            <ul className="dropdown-menu">
                {data.map((option) => (
                <li key={`${dropdownLabel}_${option}`} onClick={() => handleDropdownChange(option)}>
                    {option}
                </li>
                ))}
            </ul>
            )}
        </div>
        )
    }

    return(
    <form onSubmit={(e) => handleOnSubmit(e)}>
        <label> Food Name:
            <input type="text" onChange={(e) => handleOnChange(e, setFoodName)}></input>
        </label>
        <label> Price:
            <input type="number" onChange={(e) => handleOnChange(e, setPrice)}></input>
        </label>
        <label> Ingredients:
            <input type="text" onChange={(e) => handleOnChange(e, setIngredients)}></input>
        </label>
        <label> Category:
            <FoodUpdateDropdown data={CATEGORY_OPTIONS} dropdownLabel={"Select Category"} toggleDropdown={toggleCategoryDropdown} handleDropdownChange={handleCategoryChange}/>
        </label>
        <button type="submit">Search</button>
    </form>
    )
}

function UpdateTable({data, renderTable}) {
    let headers = ['ID', "Establishment ID", "Food Name", "Price", "Ingredients", "Category"];


    const [open, setModal] = React.useState(false);
    const [targetId, setTargetId] = useState(null);

    function toggleModal(targetId) {
        setTargetId(targetId);
        setModal(!open);
    }

    async function handleDelete(food_id) {
        console.log(food_id);
        try {
            let request_body = {
                "food_id": food_id
            };

            let response = await axios.post(
                `http://${SERVER}/api/delete-food`,
                request_body
            )

            console.log(response);

            if (response.data.success) {
                alert("Successfully deleted food.");
                renderTable();
            }

        } catch (err) {
            console.log(["There was an error", err]);
        }
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
                return <tr key={`${item.food_id}${item.food_name}`}>
                    <td>{item.food_id}</td>
                    <td>{item.establishment_id}</td>
                    <td>{item.food_name}</td>
                    <td>{item.price}</td>
                    <td>{item.ingredients}</td>
                    <td>{item.category}</td>
                    <td>
                    <button type="button" onClick={() => {toggleModal(item.food_id)}}>
                        Update Establishment
                    </button>
                    <MdDelete onClick={ async () => { await handleDelete(item.establishment_id) } }/>
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

function UpdateFood() {

    const [food, setFood] = useState([]);
    const [allFood, setAllFood] = useState([]);

    const fetchFood = async () => {
        try {
            const response = await axios.get(
                `http://${SERVER}/api/get-food-by-user-id?user_id=${user_id}`
            );
            setFood(response.data.data);
            setAllFood(response.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect( () => {
        console.log("Fetching food data.");
        fetchFood();
        console.log(food);
    }, []);

    return(
    <div className='container'>
    
    <UpdateTable data={food} renderTable={() => {fetchFood()}}/>
    </div>
    )
}

export default UpdateFood;