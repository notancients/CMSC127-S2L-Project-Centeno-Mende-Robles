// View all food items from an establishment;
// 4. View all food items from an establishment that belong to a food type {meat | veg | etc.};
// View all food items from an establishment arranged according to price;
// 8. Search food items from any establishment based on a given price range and/or food type.

import POOL from '../server/pool.js';

async function createFood({food_name, price, establishment_id, created_by}) {
    const QUERY = "INSERT INTO FOOD(food_name, price, establishment_id) VALUES (?, ?, ?)";
    
    try {
        const result = await POOL.query(
            QUERY,
            [food_name, price, establishment_id,created_by]
        );

        let success_message = {
            "success": true,
            "data": result[0],
            "message": `Successfully added a food entry: ${food_name}.`
        };
        
        return success_message;

    } catch (e) {
        console.log(e);

        let failure_message = {
            "success": false,
            "data": [e],
            "message": "There was an error with adding a food entry."
        };
        return failure_message;
    }
}

async function getFoodByEstablishment({establishment_name}) {
    const QUERY = `SELECT * FROM FOOD f LEFT JOIN ESTABLISHMENT e ON e.establishment_id as C WHERE C.establishment_name LIKE '%%'`;

    try {
        const result = await POOL.query(
            QUERY,
            [establishment_name]
        )
        
        let success_message = {
            "success": true,
            "data": result[0],
            "message": `Successfully found food entries for: ${establishment_name}.`
        };
        
        return success_message;

    } catch (e) {
        let failure_message = {
            "success": false,
            "data": result,
            "message": `There was an error getting food entries for: ${establishment_name}.`
        };
        return failure_message;
    }
}

export {
    createFood,
    getFoodByEstablishment
}