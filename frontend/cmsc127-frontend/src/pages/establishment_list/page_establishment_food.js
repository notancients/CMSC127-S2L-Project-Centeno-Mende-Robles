import axios from 'axios';
import { useEffect, useState } from 'react';
import ENV from '../../env';

let SERVER = ENV.SERVER;
let HEADER = ENV.HEADER;

function FoodByEstablishment({ match }) {
    const establishment_name = match.params.establishment_name;

    let [food, setFood] = useState([]);

    useEffect( () => {
        console.log("Fetching food by establishment name.");
        const fetchFoodByEstablishment = async () => {
            try {
                const response = await axios.get(
                    `http://${SERVER}/api/get-food-by-establishment?establishment_name=${establishment_name}`,
                    HEADER
                );
                console.log(response.data.data[0]);
                setFood(response.data.data[0]);
            } catch (err) {
                console.log(err);
            }
        }

        fetchFoodByEstablishment();
    }, []);
}

export default FoodByEstablishment;