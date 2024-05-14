// View all food items from an establishment;
// 4. View all food items from an establishment that belong to a food type {meat | veg | etc.};
// View all food items from an establishment arranged according to price;
// 8. Search food items from any establishment based on a given price range and/or food type.

import POOL from '../server/pool.js';

async function createFood({food_name, price, establishment_id, created_by}) {
    const QUERY = "INSERT INTO FOOD(food_name, price, establishment_id) VALUES (?, ?, ?, ?)";
    try {
        const result = POOL.query(
            QUERY,
            [food_name, price, establishment_id,created_by]
        );

        let success_message = {
            "success": true,
            "data": [],
            "message": "Successfully added a food entry: ."
        };
        
        return success_message;

    } catch (e) {
        let failure_message = {
            "success": false,
            "data": [],
            "message": "There was an error with adding a food entry."
        };
        return failure_message;
    }
}

// async function getFoodByEstablishment(establishment_id) {
    
//     try {
//         const result = await POOL.query()
//         let success_message = {
//             "success": true,
//             "data": [],
//             "message": "Successfully found food entry for: ."
//         };
        
//         return success_message;

//     } catch (e) {
//         let failure_message = {
//             "success": false,
//             "data": [],
//             "message": "There was an error getting food entry for: ."
//         };
//         return failure_message;
//     }
// }

export {
    createFood
}