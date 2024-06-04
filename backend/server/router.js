import express from "express";


import {
    createEstablishmentAPI,
    deleteEstablishmentAPI,
    getEstablishmentByIdAPI,
    searchEstablishmentAPI,
    updateEstablishmentAPI,
    viewAllEstablishmentAPI,
    viewHighlyRatedEstablishmentAPI,
    getEstablishmentByUserIdAPI
} from "./establishment_api_controller.js"

import {
    createUserAPI,
    loginAPI
} from "./user_api_controller.js";

import {
    populateEstablishmentsAPI,
    populateFoodAPI,
    populateUsersAPI,
    populateReviewAPI
} from "../sample_data/populate_database.js";

import {
    createFoodAPI,
    deleteFoodAPI,
    updateFoodAPI,
    getFoodByEstablishmentAPI,
    getFoodByTypeAPI,
    getFoodByPriceRangeAndCategoryAPI,
    getFoodByUserIdAPI
} from "./food_api_controller.js";


import {
    createReviewAPI,
    deleteReviewAPI,
    updateReviewAPI,
    viewReviewsAPI,
    viewReviewsByDateAPI,
    getReviewByUserIdAPI
} from "./review_api_controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        "success": true,
        "data": [],
        "message": "Welcome to the homepage."
    });
});

// DATA POPULATION
router.get("/api/populate-users", populateUsersAPI);
router.get("/api/populate-establishments", populateEstablishmentsAPI);
router.get("/api/populate-food", populateFoodAPI);
router.get("/api/populate-review", populateReviewAPI);

// USER API


router.post("/api/create-user", createUserAPI);
router.post("/api/login", loginAPI);

// ESTABLISHMENT API
router.post("/api/create-establishment", createEstablishmentAPI);
router.get("/api/search-establishment", searchEstablishmentAPI);
router.patch("/api/update-establishment", updateEstablishmentAPI);
router.post("/api/delete-establishment", deleteEstablishmentAPI);
router.get("/api/view-all-establishment", viewAllEstablishmentAPI);
router.get("/api/get-highly-rated-establishment", viewHighlyRatedEstablishmentAPI)
router.get("/api/get-establishment-by-id", getEstablishmentByIdAPI);
router.get("/api/get-establishment-by-user-id", getEstablishmentByUserIdAPI);

// FOOD API
router.post("/api/create-food", createFoodAPI);
router.post("/api/delete-food", deleteFoodAPI);
router.patch("/api/update-food", updateFoodAPI);
router.get("/api/get-food-by-establishment", getFoodByEstablishmentAPI);
router.get("/api/get-food-by-type", getFoodByTypeAPI);
router.get("/api/get-food-by-price-category", getFoodByPriceRangeAndCategoryAPI);
router.get("/api/get-food-by-user-id", getFoodByUserIdAPI);



// REVIEW API
router.post("/api/create-review", createReviewAPI);
router.patch("/api/update-review", updateReviewAPI);
router.delete("/api/delete-review", deleteReviewAPI);
router.get("/api/view-reviews", viewReviewsAPI);
router.get("/api/view-reviews-by-date", viewReviewsByDateAPI);
router.get("/api/get-review-by-user-id", getReviewByUserIdAPI);

export default router;