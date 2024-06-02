import axios from 'axios';
import { useEffect, useState } from 'react';
import ENV from '../../env';
import { useLocation, useParams } from 'react-router-dom';
import FoodTable from '../components/food_table';

let SERVER = ENV.SERVER;
let HEADER = ENV.HEADER;

const categories = [ "Filipino","Greek","Western","Asian","Japanese","Turkish","Vietnamese","Chinese","Fusion","Thai","Russian","Korean" ]

function FoodByEstablishment() {
    // Get a specific query parameter
    const {establishment_id} = useParams();

    let [allFood, setAllFood] = useState([]); // this is used to store the complete array of food served by the restaurant
    let [food, setFood] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

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
    const handleClick = (option) => {
        setFood(filterCategory(option));
        setIsOpen(false);
    };


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

    function CategoryDropdown() {
        return(
        <div className="dropdown">
            <button onClick={toggleDropdown}>Select by Category</button>
            {isOpen && (
            <ul className="dropdown-menu">
                {categories.map((option) => (
                <li key={`category_${option}`} onClick={() => handleClick(option)}>
                    {option}
                </li>
                ))}
            </ul>
            )}
        </div>
        )
    }

    return(
    <>
    <div className='container'>
        <FoodTable data={food}/>
        <div>
            <button>Sort by Price</button>
            <CategoryDropdown/>
        </div>
    </div>
    </>
    )
}

export default FoodByEstablishment;