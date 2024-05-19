import {
    createEstablishment,
    searchEstablishment,
    updateEstablishment,
    deleteEstablishment,
    viewAllEstablishment,
    viewHighlyRatedEstablishment
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

    const updateEstablishment_result = await updateEstablishment(req.body);

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

async function viewAllEstablishmentAPI(req, res) {
    console.log("View all establishment API has been called.");

    const viewAllEstablishment_result = await viewAllEstablishment();

    if(viewAllEstablishment_result.success) {
        res.status(200).json(viewAllEstablishment_result);
    } else {
        res.status(500).json(viewAllEstablishment_result);
    }
    
}

async function viewHighlyRatedEstablishmentAPI(req, res) {
    console.log("View highly rated establishment API has been called.");

    const viewHighlyRatedEstablishment_result = await viewHighlyRatedEstablishment();

    if(viewHighlyRatedEstablishment_result.success) {
        res.status(200).json(viewHighlyRatedEstablishment_result);
    } else {
        res.status(500).json(viewHighlyRatedEstablishment_result);
    }
}

export {
    createEstablishmentAPI,
    searchEstablishmentAPI,
    updateEstablishmentAPI,
    deleteEstablishmentAPI,
    viewAllEstablishmentAPI,
    viewHighlyRatedEstablishmentAPI
}