import { createFood } from "../food/food_controller.js";

const createFoodAPI = async (req, res) => {
    const createFood_result = await createFood(req.body);

    const response = {
        "success": createFood_result.success,
        "data": createFood_result.data,
        "message": createFood_result.message
    }
    
    res.send(response);
}

export {
    createFoodAPI
}