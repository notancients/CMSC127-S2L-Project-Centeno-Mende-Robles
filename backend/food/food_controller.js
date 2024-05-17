// View all food items from an establishment;
// 4. View all food items from an establishment that belong to a food type {meat | veg | etc.};
// View all food items from an establishment arranged according to price;
// 8. Search food items from any establishment based on a given price range and/or food type.

import { POOL } from '../server/pool.js';
import { arrayIntoTupleParameter } from './food_controller_utility.js';

async function createFood({food_name, price, establishment_id, image_url, ingredients, category}) {
    
    let food_table_result;


    console.log("Inserting food into main table.");
    try {
        const FOOD_QUERY = "INSERT INTO FOOD(food_name, price, establishment_id) VALUES (?, ?, ?)";
        let created_food = await POOL.query(
            FOOD_QUERY,
            [food_name, price, establishment_id]
        );

        food_table_result = created_food;

    } catch (err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with creating a food."
        }
    }



    console.log("Inserting food image.");
    try {
        const IMAGE_QUERY = "INSERT INTO FOOD_IMAGE(food_id, link) VALUES (?, ?)";
        let created_food_image = await POOL.query(
            IMAGE_QUERY,
            [food_table_result[0].insertId, image_url]
        );           

    } catch (err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with inserting an image for the food."
        }
    }



    console.log("Inserting food ingredients.");
    ingredients.forEach(async (element) => {
        // console.log(element);
        try {
            const INGREDIENT_QUERY = "INSERT INTO FOOD_INGREDIENTS(food_id, ingredients) VALUES (?, ?)";
            let created_food_ingredient = await POOL.query(
                INGREDIENT_QUERY,
                [food_table_result[0].insertId, element]
            );           
    
        } catch (err) {
            console.log(["There was an error:", err]);
            return {
                "success": false,
                "data": err,
                "message": "There was an error with inserting an ingredient for the food."
            }
        }
    });

    console.log("Inserting food category.");
    category.forEach(async (element) => {
        // console.log(element);
        try {
            const CATEGORY_QUERY = "INSERT INTO FOOD_CATEGORY(food_id, food_category) VALUES (?, ?)";
            let created_food_ingredient = await POOL.query(
                CATEGORY_QUERY,
                [food_table_result[0].insertId, element]
            );           
    
        } catch (err) {
            console.log(["There was an error:", err]);
            return {
                "success": false,
                "data": err,
                "message": "There was an error with inserting a category for the food."
            }
        }
    });

    return {
        "success": true,
        "data": food_table_result,
        "message": "Successfulyl inserted a food."
    };
}




async function editFood({food_id, food_name, price, establishment_name}) {
    const QUERY = "SELECT * FROM FOOD f NATURAL JOIN ESTABLISHMENT e where `establishment_name` LIKE '%?%'";

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




async function deleteFood({food_id}) {
    const QUERY = "DELETE FROM FOOD WHERE food_id=?";

    try {
        const result = await POOL.query(
            QUERY,
            [food_id]
        )
        
        let success_message = {
            "success": true,
            "data": result[0],
            "message": `Successfully deleted a food entry.`
        };
        
        return success_message;

    } catch (e) {
        let failure_message = {
            "success": false,
            "data": result,
            "message": `There was an error deleting a food entry.`
        };
        return failure_message;
    }
}




async function getFoodByEstablishment({establishment_name}) {
    const QUERY = "SELECT * FROM FOOD f NATURAL JOIN ESTABLISHMENT e where `establishment_name` LIKE '%?%'";

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




async function getFoodByPriceRange({establishment_name, min_price, max_price}) {
    const QUERY = "SELECT * FROM FOOD WHERE price BETWEEN ? AND ?";

    try {
        const result = await POOL.query(
            QUERY,
            [min_price, max_price]
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




async function getFoodByCategory({category_array}) {
    const QUERY = "SELECT * FROM (FOOD NATURAL JOIN FOOD_CATEGORY) WHERE food_category IN ?"

    let list_parameter = arrayIntoTupleParameter(category_array);

    try {
        const result = await POOL.query(
            QUERY,
            [list_parameter]
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
    getFoodByEstablishment,
    getFoodByPriceRange,
    editFood,
    deleteFood
}