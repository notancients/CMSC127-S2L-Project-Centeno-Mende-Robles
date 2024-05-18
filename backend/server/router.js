import express from "express";


import {
    createEstablishmentAPI,
    deleteEstablishmentAPI,
    searchEstablishmentAPI,
    updateEstablishmentAPI
} from "./establishment_api_controller.js"

import { createUserAPI } from "./user_api_controller.js";

import { 
    populateEstablishmentsAPI, 
    populateUsersAPI 
} from "../sample_data/populate_database.js";

import {
    createFoodAPI,
    deleteFoodAPI,
    updateFoodAPI,
    getFoodByEstablishmentAPI
} from "./food_api_controller.js";


import {
    createReviewAPI,
    deleteReviewAPI,
    updateReviewAPI
} from "./review_api_controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        "success":true,
        "data": [],
        "message": "Welcome to the homepage."
    });
});

// DATA POPULATION
router.get("/api/populate-users", populateUsersAPI);
router.get("/api/populate-establishments", populateEstablishmentsAPI);

// USER API


router.post("/api/create-user", createUserAPI);

// ESTABLISHMENT API
router.post("/api/create-establishment", createEstablishmentAPI);
router.get("/api/search-establishment", searchEstablishmentAPI);
router.patch("/api/update-establishment", updateEstablishmentAPI);
router.delete("/api/delete-establishment", deleteEstablishmentAPI);

// FOOD API
router.post("/api/create-food", createFoodAPI);
router.delete("/api/delete-food", deleteFoodAPI);
router.patch("/api/update-food", updateFoodAPI);
router.get("/food/get-food-by-establishment", getFoodByEstablishmentAPI);


// REVIEW API
router.post("/api/create-review", createReviewAPI);
router.patch("/api/update-review", updateReviewAPI);
router.delete("/api/delete-review", deleteReviewAPI);

export default router;