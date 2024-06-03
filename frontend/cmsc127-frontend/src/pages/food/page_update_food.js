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
    
    async function handleOnSubmit(event) {
        event.preventDefault();

        try {
            let request_body = {
                "food_id": targetId,
                "food_name": foodName,
                "price": price,
                "ingredients": ingredients,
                "category": category,
                "image_url": []
            };

            // console.log(request_body);

            let response = await axios.patch(
                `http://${SERVER}/api/update-food`,
                request_body,
                HEADER
            )
            
            console.log(response);

            if(response.data.success) {
                renderTable();
                toggleModal();
                alert("Succesfully updated food details.");
            }
        } catch (err) {
            console.log(["There was an error:", err]);
        }
    }

    function handleCategoryChange(event) {
        let newCategories = event.target.value;
        newCategories = newCategories.split(',');


        setCategory(newCategories);
    };

    function handleIngredientChange(event) {
        console.log(event.target.value);
        let newIngredients = event.target.value;
        newIngredients = newIngredients.split(',');

        setIngredients(newIngredients);
    }

    function handleOnChange(event, setFunction) {
        setFunction(event.target.value);
    }

    return(
    <div className='update-form-body'>
        <form onSubmit={(e) => handleOnSubmit(e)}>
        <label> Food Name:
            <input type="text" onChange={(e) => handleOnChange(e, setFoodName)}></input>
        </label>
        <label> Price:
            <input type="number" onChange={(e) => handleOnChange(e, setPrice)} step={0.25}></input>
        </label>
        <label> Ingredients:
            <input type="text" onChange={(e) => handleIngredientChange(e)} placeholder='Ingredient 1, Ingredient 2, Ingredient 3, etc.'></input>
        </label>
        <label> Category:
            <input type="text" onChange={(e) => handleCategoryChange(e)} placeholder='Category 1, Category 2, Category 3, etc.'></input>
        </label>
        <button type="submit">Search</button>
    </form>
    </div>
    )
}

function UpdateTable({data, renderTable}) {
    let headers = ['ID', "Establishment ID", "Food Name", "Price", "Ingredients", "Category", "Update", "Delete"];


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
                    <td>{(item.ingredients).join(", ")}</td>
                    <td>{item.category}</td>
                    <td>
                    <button type="button" onClick={() => {toggleModal(item.food_id)}}>
                        Update Food Details
                    </button>
                    <MdDelete onClick={ async () => { await handleDelete(item.food_id) } }/>
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