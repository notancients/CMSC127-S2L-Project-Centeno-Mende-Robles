import express from "express";
import POOL from "./pool.js";
import { createFoodAPI } from "./food_api_controller.js";

import {
    createEstablishmentAPI
} from "./establishment_api_controller.js"



const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        "success":true,
        "data": [],
        "message": "Welcome to the homepage."
    });
});

// ESTABLISHMENT API
router.post("/api/create-establishment", createEstablishmentAPI);


// FOOD API
router.post("/food/create-food", createFoodAPI);

export default router;