import {
    createEstablishment
} from "../establishment/establishment_controller.js";




async function createEstablishmentAPI(req, res) {
    console.log("Create establishment API has been called.");

    const createEstablishment_result = await createEstablishment(req.body);

    if(createEstablishment_result.success) {
        res.status(200).json(createEstablishment_result);
    } else {
        res.status(500).json(createEstablishment_result);
    }
    
}

export {
    createEstablishmentAPI
}