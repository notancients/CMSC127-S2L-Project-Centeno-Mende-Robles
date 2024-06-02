import axios from 'axios';
import { useEffect, useState } from 'react';
import ENV from '../../env';
import { useLocation, useParams } from 'react-router-dom';
import FoodTable from '../components/food_table';

let SERVER = ENV.SERVER;
let HEADER = ENV.HEADER;


function FoodByEstablishment() {
    // Get a specific query parameter
    const {establishment_id} = useParams();

    let [food, setFood] = useState([]);

    useEffect( () => {
        console.log("Fetching food by establishment name.");
        const fetchFoodByEstablishment = async () => {
            try {
                const response = await axios.get(
                    `http://${SERVER}/api/get-food-by-establishment?establishment_id=${establishment_id}`,
                    HEADER
                );
                console.log(response.data.data);
                setFood(response.data.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchFoodByEstablishment();
    }, []);

    return(
    <>
    <div className='container'>
        <FoodTable data={food}/>
    </div>
    </>
    )
}

export default FoodByEstablishment;