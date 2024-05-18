import { 
    createFood, 
    deleteFood, 
    editFood, 
    getFoodByEstablishment 
} from "../food/food_controller.js";

const createFoodAPI = async (req, res) => {
    // console.log(req.body);
    const createFood_result = await createFood(req.body);
    console.log(createFood_result);
    if(createFood_result.success) {
        res.status(200).json(createFood_result);
    } else {
        res.status(500).json(createFood_result);
    }
}

async function updateFoodAPI(req, res) {
    console.log("Update food API has been called.");

    const updateFood_result = await editFood(req.body);
    
    if(updateFood_result.success) {
        res.status(200).json(updateFood_result);
    } else {
        res.status(500).json(updateFood_result);
    }
}

async function deleteFoodAPI(req, res) {
    console.log("Delete food API has been called.");

    const deleteFood_result = await deleteFood(req.body);
    
    if(deleteFood_result.success) {
        res.status(200).json(deleteFood_result);
    } else {
        res.status(500).json(deleteFood_result);
    }
}


const getFoodByEstablishmentAPI = async (req, res) => {
    // console.log(req.body);
    const getFoodByEstablishment_result = await getFoodByEstablishment(req.query);

    const response = {
        "success": getFoodByEstablishment_result.success,
        "data": getFoodByEstablishment_result.data,
        "message": getFoodByEstablishment_result.message
    }
    
    res.send(response);
}
async function getFoodByTypeAPI (req, res) {
    // console.log(req.body);
    const getFoodByType_result = await getFoodByType(req.query);

    if(getFoodByType_result.success) {
        res.status(200).json(getFoodByType_result);
    } else {
        res.status(500).json(getFoodByType_result);
    }
}

async function getFoodByPriceAPI(req, res) {
    // console.log(req.body);
    const getFoodByEstablishment_result = await getFoodByPrice(req.query);

    const response = {
        "success": getFoodByEstablishment_result.success,
        "data": getFoodByEstablishment_result.data,
        "message": getFoodByEstablishment_result.message
    }
    
    res.send(response);
}

export {
    createFoodAPI,
    updateFoodAPI,
    deleteFoodAPI,
    getFoodByEstablishmentAPI,
    getFoodByTypeAPI,
    getFoodByPriceAPI
}