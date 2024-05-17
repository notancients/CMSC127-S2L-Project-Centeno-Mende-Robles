import {
    USER_SAMPLE_DATA
} from "./user_sample_data.js"

import { createUser } from "../user/user_controller.js"

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

export {
    populateUsersAPI
}