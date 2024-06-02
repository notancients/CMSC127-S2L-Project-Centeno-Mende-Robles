// View all food items from an establishment;
// 4. View all food items from an establishment that belong to a food type {meat | veg | etc.};
// View all food items from an establishment arranged according to price;
// 8. Search food items from any establishment based on a given price range and/or food type.

import { POOL } from '../server/pool.js';
import { arrayIntoTupleParameter } from './food_controller_utility.js';

async function insertImage(food_id, image_url) {
    console.log("Inserting food image.");
    [...image_url].forEach(async (element) => {
        try {
            const IMAGE_QUERY = "INSERT INTO FOOD_IMAGE(food_id, link) VALUES (?, ?)";
            let created_food_image = await POOL.query(
                IMAGE_QUERY,
                [food_id, image_url]
            );           
    
        } catch (err) {
            console.log(["There was an error:", err]);
            return {
                "success": false,
                "data": err,
                "message": "There was an error with inserting an image for the food."
            }
        }
    });

    return {
        "success": true,
        "data": null,
        "message": "Successfully inserted all images for the food."
    }
}

async function insertIngredients(food_id, ingredients) {
    console.log("Inserting food ingredients.");
    ingredients.forEach(async (element) => {
        // console.log(element);
        try {
            const INGREDIENT_QUERY = "INSERT INTO FOOD_INGREDIENTS(food_id, ingredients) VALUES (?, ?)";
            let created_food_ingredient = await POOL.query(
                INGREDIENT_QUERY,
                [food_id, element]
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

    return {
        "success": true,
        "data": null,
        "message": "Successfully inserted all ingredients for the food."
    }
}

async function insertCategory(food_id, category) {
    console.log("Inserting food category.");
    category.forEach(async (element) => {
        // console.log(element);
        try {
            const CATEGORY_QUERY = "INSERT INTO FOOD_CATEGORY(food_id, food_category) VALUES (?, ?)";
            let created_food_ingredient = await POOL.query(
                CATEGORY_QUERY,
                [food_id, element]
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
        "data": null,
        "message": "Successfully inserted all categories for the food."
    }
}

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

    const food_id = food_table_result[0].insertId;

    // Insert image
    const image_result = await insertImage(food_id, image_url);
    if(!image_result.success) { return image_result; }

    const ingredient_result = await insertIngredients(food_id, ingredients);
    if(!ingredient_result.success) { return ingredient_result; }

    const category_result = await insertCategory(food_id, category);
    if(!category_result.success) { return category_result; }

    return {
        "success": true,
        "data": food_table_result,
        "message": "Successfully inserted a food."
    };
}



async function deleteImage(food_id) {
    // Delete related images
    try {
        const UPDATE_DELETE_IMAGE_QUERY = "DELETE FROM FOOD_IMAGE WHERE food_id=?";
        const deleted_food_image = await POOL.query(
            UPDATE_DELETE_IMAGE_QUERY,
            [food_id]
        )

        return {
            "success": true,
            "data": deleted_food_image,
            "message": "Successfully deleted image."
        }

    } catch(err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with deleting a food image for update."
        }
    }
}

async function deleteIngredient(food_id) {
    // Delete related ingredients 
    try {
        const UPDATE_DELETE_INGREDIENT_QUERY = "DELETE FROM FOOD_INGREDIENTS WHERE food_id=?";
        const deleted_food_ingredient = await POOL.query(
            UPDATE_DELETE_INGREDIENT_QUERY,
            [food_id]
        )

        return {
            "success": true,
            "data": deleted_food_ingredient,
            "message": "Successfully deleted ingrdients."
        }

    } catch(err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with deleting a food ingredient for update."
        }
    }
}

async function deleteCategory(food_id) {
    // Delete related category
    try {
        const UPDATE_DELETE_CATEGORY_QUERY = "DELETE FROM FOOD_CATEGORY WHERE food_id=?";
        const deleted_food_ingredient = await POOL.query(
            UPDATE_DELETE_CATEGORY_QUERY,
            [food_id]
        )

        return {
            "success": true,
            "data": deleted_food_ingredient,
            "message": "Successfully deleted category."
        }

    } catch(err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with deleting a food category for update."
        }
    }
}


async function editFood({food_id, food_name, price, establishment_id, image_url, ingredients, category}) {
    console.log("Updating food details.");

    // Delete all entries on the reference tables

    const deleted_image = await deleteImage(food_id);
    if (!deleted_image.success) { return deleted_image};

    const deleted_ingredient = await deleteIngredient(food_id);
    if (!deleted_ingredient.success) { return deleted_ingredient};

    const deleted_category = await deleteCategory(food_id);
    if (!deleted_category.success) { return deleted_category};



    // This part is the actual update
    try {
        const UPDATE_FOOD_QUERY = "UPDATE FOOD SET food_name=?, price=? WHERE food_id=?"
        const food_update = await POOL.query(
            UPDATE_FOOD_QUERY,
            [food_name, price, food_id]
        )

        const image_result = await insertImage(food_id, image_url);
        if(!image_result.success) { return image_result; }

        const ingredient_result = await insertIngredients(food_id, ingredients);
        if(!ingredient_result.success) { return ingredient_result; }

        const category_result = await insertCategory(food_id, category);
        if(!category_result.success) { return category_result; }

        return {
            "success": true,
            "data": food_update,
            "message": "Successfully updated food details."
        }

    } catch (err) {

        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with updating a food."
        }

    }
}




async function deleteFood({food_id}) {
    console.log("Deleting a food entry.");

    const deleted_image = await deleteImage(food_id);
    if (!deleted_image.success) { return deleted_image};

    const deleted_ingredient = await deleteIngredient(food_id);
    if (!deleted_ingredient.success) { return deleted_ingredient};

    const deleted_category = await deleteCategory(food_id);
    if (!deleted_category.success) { return deleted_category};

    try {
        const DELETE_FOOD_QUERY = "DELETE FROM FOOD WHERE food_id=?";

        const deleted_food = await POOL.query(
            DELETE_FOOD_QUERY,
            [food_id]
        )
        
        return {
            "success": true,
            "data": deleted_food,
            "message": `Successfully deleted a food entry.`
        }

    } catch (err) {
        console.log(["There was an error: ", err]);
        return {
            "success": false,
            "data": err,
            "message": `There was an error deleting a food entry.`
        }
    }
}


async function getIngredients(food_id) {
    const INGREDIENT_QUERY = "SELECT ingredients FROM FOOD_INGREDIENTS WHERE food_id=?";
    const foodIngredient = await POOL.query(INGREDIENT_QUERY, [food_id]);

    let ingredients = foodIngredient[0].map((element) => {
        return(element["ingredients"]);
    });
    return ingredients;
}

async function getImages(food_id) {
    const IMAGE_QUERY = "SELECT link FROM FOOD_IMAGE WHERE food_id=?";
    const foodImages = await POOL.query(IMAGE_QUERY, [food_id]);

    let images = foodImages[0].map((element) => {
        return(element["link"]);
    });
    return images;
}

async function getCategory(food_id) {
    const CATEGORY_QUERY = "SELECT food_category FROM FOOD_CATEGORY WHERE food_id=?";
    const foodCategory = await POOL.query(CATEGORY_QUERY, [food_id]);

    let category = foodCategory[0].map((element) => {
        return(element["food_category"]);
    });
    return category;
}

async function getFoodById(food_id) {
    console.log("Retrieving food by id.");

    try {
        const FOOD_BY_ID_QUERY = "SELECT * FROM FOOD WHERE food_id=?";
        
        const foodById = await POOL.query(
            FOOD_BY_ID_QUERY,
            [food_id]
        );
        
        let completeFoodDetails = foodById[0][0];
        completeFoodDetails["images"] = await getImages(food_id);
        completeFoodDetails["ingredients"] = await getIngredients(food_id);
        completeFoodDetails["category"] = await getCategory(food_id);

        return {
            "success": true,
            "data": completeFoodDetails,
            "message": `Successfully found food entries for the given id.`
        };
    } catch (err) {
        console.log("There was an error: ", err);
        return {
            "success": false,
            "data": err,
            "message": `There was an error getting food the given id.`
        };
    }
}

async function getFoodByEstablishment({establishment_id}) {
    const QUERY = "SELECT * FROM FOOD WHERE establishment_id=?";

    try {
        const foodByEstablishment = await POOL.query(
            QUERY,
            [establishment_id]
        )
        
        let completeFoodDetails = foodByEstablishment[0];
        // We need to combine the results of the foods with their corresponding
        // related details

        // console.log(completeFoodDetails);
        return {
            "success": true,
            "data": completeFoodDetails,
            "message": `Successfully found food entries for: ${establishment_id}.`
        };

    } catch (err) { 
        return {
            "success": false,
            "data": err,
            "message": `There was an error getting food entries for: ${establishment_id}.`
        };
    }
}



async function getFoodByCategory({category, establishment_name}) {
    console.log("Getting food by category.");

    let qn_mark_placeholder = [...category].map(() => '?').join(', '); // create the appropriate amount of qn mark place holerds
    
    const QUERY = `SELECT DISTINCT food_id from (FOOD f NATURAL JOIN ESTABLISHMENT e) NATURAL JOIN FOOD_CATEGORY WHERE establishment_name LIKE ? AND \`food_category\` IN (${qn_mark_placeholder})`;
    try {
        const foodByCategory = await POOL.query(
            QUERY,
            [`%${establishment_name}%` ,...category]
        );
        
        let completeFoodDetails = foodByCategory[0];

        try {
            for (let i = 0; i<completeFoodDetails.length; i++) {
                let food_id = completeFoodDetails[i].food_id;

                completeFoodDetails[i] = (await getFoodById(food_id))["data"];
            }
        } catch(err) {
            console.log(err);
            return {
                "success": false,
                "data": err,
                "message": `There was an error retrieving the related details.`
            };
        }


        return {
            "success": true,
            "data": foodByCategory[0],
            "message": `Successfully found food entries for: ${category}.`
        };

    } catch (err) {
        console.log("There was an error: ", err);
        return {
            "success": false,
            "data": err,
            "message": `There was an error getting food entries for the category(ies): ${category}.`
        };
    }
}

async function getFoodByPriceRange({establishment_name, min_price, max_price}) {
    const QUERY = "SELECT food_id FROM FOOD NATURAL JOIN ESTABLISHMENT WHERE establishment_name LIKE ? AND price BETWEEN ? AND ?";

    try {
        const foodByPriceRange = await POOL.query(
            QUERY,
            [`%${establishment_name}%`, min_price, max_price]
        )
        
        let completeFoodDetails = foodByPriceRange[0];
        
        for (let i = 0; i<completeFoodDetails.length; i++) {
            let food_id = completeFoodDetails[i].food_id;

            completeFoodDetails[i] = (await getFoodById(food_id))["data"];
        }
        
        return {
            "success": true,
            "data": completeFoodDetails,
            "message": `Successfully found food entries for the given price range.`
        };;

    } catch (e) {
        let failure_message = {
            "success": false,
            "data": result,
            "message": `There was an error getting food entries for the given price range.`
        };
        return failure_message;
    }
}

async function getFoodByPriceRangeAndCategory({establishment_name, min_price, max_price, category}) {
    let qn_mark_placeholder = (category ? [...category].map(() => '?').join(', ') : null); // create the appropriate amount of qn mark place holerds

    let PRICE_CATEGORY_QUERY;
    if(min_price==null || max_price==null) { // no price given
        PRICE_CATEGORY_QUERY = `SELECT DISTINCT food_id from (FOOD f NATURAL JOIN ESTABLISHMENT e) NATURAL JOIN FOOD_CATEGORY WHERE \`food_category\` IN (${qn_mark_placeholder})`;

        try {
            const category_only = (await POOL.query(
                PRICE_CATEGORY_QUERY,
                [...category]
            ));

            let completeFoodDetails = category_only[0];

            for (let i = 0; i<completeFoodDetails.length; i++) {
                let food_id = completeFoodDetails[i].food_id;

                completeFoodDetails[i] = (await getFoodById(food_id))["data"];
            }
            return {
                "success": true,
                "data": completeFoodDetails,
                "message": "Retrieved food by category only."
            }

        } catch(err) {
            console.log(["There was an error: ", err]);
            return {
                "success": false,
                "data": err,
                "message": "There was an error retrieving by category."
            }
        }
/////////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (!category) { // no category given
        PRICE_CATEGORY_QUERY = "SELECT food_id FROM FOOD NATURAL JOIN ESTABLISHMENT WHERE price BETWEEN ? AND ?";

        try {
            const price_only = (await POOL.query(
                PRICE_CATEGORY_QUERY,
                [min_price, max_price]
            ));

            let completeFoodDetails = price_only[0];

            for (let i = 0; i<completeFoodDetails.length; i++) {
                let food_id = completeFoodDetails[i].food_id;

                completeFoodDetails[i] = (await getFoodById(food_id))["data"];
            }
            return {
                "success": true,
                "data": completeFoodDetails,
                "message": "Retrieved food by price only."
            }
            
        } catch(err) {
            console.log(["There was an error: ", err]);
            return {
                "success": false,
                "data": err,
                "message": "There was an error retrieving by price only."
            }
        }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////}

    // both are given

    PRICE_CATEGORY_QUERY = `SELECT DISTINCT food_id FROM FOOD NATURAL JOIN FOOD_CATEGORY WHERE food_category in (${qn_mark_placeholder}) AND price between ? and ?`;
    
    try {
        const price_category = await POOL.query(
            PRICE_CATEGORY_QUERY,
            [...category, min_price, max_price]
        )
        
        let completeFoodDetails = price_category[0];
        
        for (let i = 0; i<completeFoodDetails.length; i++) {
            let food_id = completeFoodDetails[i].food_id;

            completeFoodDetails[i] = (await getFoodById(food_id))["data"];
        }
        
        return {
            "success": true,
            "data": completeFoodDetails,
            "message": `Successfully found food entries for the given price range and category.`
        };;

    } catch (err) {
        console.log(["There was an error: ", err]);
        return {
            "success": false,
            "data": err,
            "message": `There was an error getting food entries for the given price range and category.`
        };;
    }

    
}





export {
    createFood,
    getFoodByEstablishment,
    getFoodByPriceRangeAndCategory,
    editFood,
    deleteFood,
    getFoodByCategory
}