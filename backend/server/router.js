import express from "express";
import { createFoodAPI } from "./food_api_controller.js";

import {
    createEstablishmentAPI
} from "./establishment_api_controller.js"

import { createUserAPI } from "./user_api_controller.js";



const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        "success":true,
        "data": [],
        "message": "Welcome to the homepage."
    });
});

// USER API
router.post("/api/create-user", createUserAPI);

// ESTABLISHMENT API
router.post("/api/create-establishment", createEstablishmentAPI);


// FOOD API
router.post("/food/create-food", createFoodAPI);

export default router;