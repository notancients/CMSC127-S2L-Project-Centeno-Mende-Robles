import { USER_SAMPLE_DATA } from "./user_sample_data.js"

import { ESTABLISHMENT_SAMPLE_DATA } from "./establishment_sample_data.js";

import { createUser } from "../user/user_controller.js"
import { createEstablishment } from "../establishment/establishment_controller.js";
import { createFood } from "../food/food_controller.js";
import { FOOD_SAMPLE_DATA } from "./food_sample_data.js";
import { createReview } from "../review/review_controller.js";

async function populateUsers(userArray) {
    console.log("Populating the user database.");
    for (let i = 0; i < userArray.length; i++) {
        console.log("Adding: ", userArray[i].first_name);
        await createUser(userArray[i]);
    }

    console.log("Successfully populated the user database.");
}

async function populateUsersAPI(req, res) {
    console.log("Populate user API has been called.");

    populateUsers(USER_SAMPLE_DATA);
    
    res.send({
        "success": true,
        "data": null,
        "message": "The user database has been populated."
    });
}

async function populateEstablishments(establishmentArray) {
    console.log("Populating the user database.");
    for (let i = 0; i < establishmentArray.length; i++) {
        console.log("Adding: ", establishmentArray[i].establishment_name);
        await createEstablishment(establishmentArray[i]);
    }

    console.log("Successfully populated the establishment database.");
}

async function populateEstablishmentsAPI(req, res) {
    console.log("Populate establishment API has been called.");

    populateEstablishments(ESTABLISHMENT_SAMPLE_DATA);
    
    res.send({
        "success": true,
        "data": null,
        "message": "The establishment database has been populated."
    });
}

async function populateFood(foodArray) {
    console.log("Populating the food database.");
    for (let i = 0; i < foodArray.length; i++) {
        console.log("Adding: ", foodArray[i].food_name);
        await createFood(foodArray[i]);
    }

    console.log("Successfully populated the food database.");
}

async function populateFoodAPI(req, res) {
    console.log("Populate food API has been called.");

    populateFood(FOOD_SAMPLE_DATA);
    
    res.send({
        "success": true,
        "data": null,
        "message": "The food database has been populated."
    });
}

async function populateReview(reviewArray) {
    console.log("Populating the review database.");
    for (let i = 0; i < reviewArray.length; i++) {
        console.log("Adding: ", reviewArray[i].post_content);
        await createReview(reviewArray[i]);
    }

    console.log("Successfully populated the review database.");
}

async function populateReviewAPI(req, res) {
    console.log("Populate review API has been called.");

    populateReview(FOOD_SAMPLE_DATA);
    
    res.send({
        "success": true,
        "data": null,
        "message": "The review database has been populated."
    });
}

export {
    populateUsersAPI,
    populateEstablishmentsAPI,
    populateFoodAPI,
    populateReviewAPI
}