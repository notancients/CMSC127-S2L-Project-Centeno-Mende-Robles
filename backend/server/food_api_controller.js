import { createFood, getFoodByEstablishment } from "../food/food_controller.js";

const createFoodAPI = async (req, res) => {
    // console.log(req.body);
    const createFood_result = await createFood(req.body);

    const response = {
        "success": createFood_result.success,
        "data": createFood_result.data,
        "message": createFood_result.message
    }
    
    res.send(response);
}

const getFoodByEstablishmentAPI = async (req, res) => {
    // console.log(req.body);
    const getFoodByEstablishment_result = await getFoodByEstablishment(req.body);

    const response = {
        "success": getFoodByEstablishment_result.success,
        "data": getFoodByEstablishment_result.data,
        "message": getFoodByEstablishment_result.message
    }
    
    res.send(response);
}

export {
    createFoodAPI,
    getFoodByEstablishmentAPI
}