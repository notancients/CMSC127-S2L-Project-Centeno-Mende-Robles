import { POOL } from "../server/pool.js"

async function createReview({rating, post_content, user_id, review_type, target_id}) {
    console.log("Creating a review.");

    // Validate if target establishment or food exists or not

    let exists_validator;
    if ( review_type == 0 ) { // Check food
        exists_validator = await POOL.query(
            "SELECT * FROM FOOD WHERE food_id=?",
            target_id
        );
    } else if ( review_type == 1 ) { // check establishment
        exists_validator = await POOL.query(
            "SELECT * FROM ESTABLISHMENT WHERE establishment_id=?",
            target_id
        );
    }

    if (exists_validator[0].length == 0) {
        return {
            "success": false,
            "data": null,
            "message": "The target food or establishment does not exist."
        }
    }

    try {
        const CREATE_REVIEW_QUERY = "INSERT INTO REVIEW(rating, post_content, user_id, review_type, target_id) VALUES(?, ?, ?, ?, ?)";
        
        const created_review = await POOL.query(
            CREATE_REVIEW_QUERY,
            [rating, post_content, user_id, review_type, target_id]
        );

        return {
            "success": true,
            "data": created_review,
            "message": "Successfully created a review."
        };

    } catch (err) {
        console.log("There was an error:", err);
        return {
            "success": false,
            "data": err,
            "message": "There was an error in creating a review."
        };
    }
}

async function updateReview() {

}

async function deleteReview() {

}

export {
    createReview,
    updateReview,
    deleteReview
}