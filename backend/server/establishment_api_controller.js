import {
    createEstablishment,
    searchEstablishment,
    updateEstablishment,
    deleteEstablishment
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

async function searchEstablishmentAPI(req, res) {
    console.log("Search establishment API has been called.");
    console.log(req.query);

    const searchEstablishment_result = await searchEstablishment(req.query);

    if(searchEstablishment_result.success) {
        res.status(200).json(searchEstablishment_result);
    } else {
        res.status(500).json(searchEstablishment_result);
    }
    
}

async function updateEstablishmentAPI(req, res) {
    console.log("Create establishment API has been called.");

    const createEstablishment_result = await updateEstablishment(req.body);

    if(updateEstablishment_result.success) {
        res.status(200).json(updateEstablishment_result);
    } else {
        res.status(500).json(updateEstablishment_result);
    }
    
}

async function deleteEstablishmentAPI(req, res) {
    console.log("Create establishment API has been called.");

    const deleteEstablishment_result = await deleteEstablishment(req.body);

    if(deleteEstablishment_result .success) {
        res.status(200).json(deleteEstablishment_result);
    } else {
        res.status(500).json(deleteEstablishment_result);
    }
    
}

export {
    createEstablishmentAPI,
    searchEstablishmentAPI,
    updateEstablishmentAPI,
    deleteEstablishmentAPI
}