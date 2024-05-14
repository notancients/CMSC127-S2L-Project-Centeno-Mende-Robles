import express from "express";
import POOL from "./pool.js";
import { createFoodAPI, getFoodByEstablishmentAPI } from "../api/food_api_controller.js";



const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        "success":true,
        "data": [],
        "message": "Welcome to the homepage."
    });
});

router.post("/food/create-food", createFoodAPI);
router.get("/food/get-food-by-establishment", getFoodByEstablishmentAPI);

export default router;