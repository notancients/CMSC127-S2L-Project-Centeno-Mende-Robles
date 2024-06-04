import axios from 'axios';
import { useEffect, useState } from 'react';
import ENV from '../../env';
import { useLocation, useParams } from 'react-router-dom';
import FoodTable from '../components/food_table';

let SERVER = ENV.SERVER;
let HEADER = ENV.HEADER;

const categories = ["None", "Filipino","Greek","Western","Asian","Japanese","Turkish","Vietnamese","Chinese","Fusion","Thai","Russian","Korean" ]

function FoodByEstablishment() {
    // Get a specific query parameter
    const {establishment_id} = useParams();

    console.log(establishment_id);
    
    let [allFood, setAllFood] = useState([]); // this is used to store the complete array of food served by the restaurant
    let [food, setFood] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const [ascendingPrice, setAscendingPrice] = useState(null);

    useEffect( () => {
        console.log("Fetching food by establishment name.");
        const fetchFoodByEstablishment = async () => {
            try {
                const response = await axios.get(
                    `http://${SERVER}/api/get-food-by-establishment?establishment_id=${establishment_id}`,
                    HEADER
                );
                // console.log(response.data.data);
                setAllFood(response.data.data)
                setFood(response.data.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchFoodByEstablishment();
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    function filterCategory(category) {
        let foodListByCategory = [];
        allFood.map((element) => {
            if(element.category.includes(category)) {
                console.log(element);
                foodListByCategory.push(element);
            }
        })
        return foodListByCategory;
    }
    const handleSelect = (option) => {
        if(option === "None") {
            setFood(allFood);
        } else {
            setFood(filterCategory(option));
        }
        setIsOpen(false);
    };

    function CategoryDropdown() {
        return(
        <div className="dropdown">
            <button onClick={toggleDropdown}>Select by Category</button>
            {isOpen && (
            <ul className="dropdown-menu">
                {categories.map((option) => (
                <li key={`category_${option}`} onClick={() => handleSelect(option)}>
                    {option}
                </li>
                ))}
            </ul>
            )}
        </div>
        )
    }


    function handleSortByPrice() {
        console.log("Sorting by price.");
        if(ascendingPrice == null) setAscendingPrice(false);

        setAscendingPrice(!ascendingPrice);
        
        let newFood = [...food];
        newFood.sort( (a, b) => ascendingPrice ? b.price - a.price : a.price - b.price);
        
        setFood(newFood);
    }


    function SortByPriceButton() {
        return(
        <>
        <button onClick={handleSortByPrice}>
            Sort by Price
        </button>
        {ascendingPrice != null && `${ascendingPrice ? "Ascending" : "Descending"}`}
        </>
        );
    }

    return(
    <>
    <div className='container'>
        <FoodTable data={food}/>
        <div>
            <SortByPriceButton/>
            <CategoryDropdown/>
        </div>
    </div>
    </>
    )
}

export default FoodByEstablishment;