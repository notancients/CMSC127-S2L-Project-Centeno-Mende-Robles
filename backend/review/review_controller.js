import { POOL } from "../server/pool.js"

async function createReview({ rating, post_content, user_id, review_type, target_id }) {
    console.log("Creating a review.");

    // Validate if target establishment or food exists or not

    let exists_validator;
    if (review_type == 0) { // Check food
        exists_validator = await POOL.query(
            "SELECT * FROM FOOD WHERE food_id=?",
            target_id
        );

    } else if (review_type == 1) { // check establishment
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
    } else {
        exists_validator = await POOL.query("SELECT COUNT(*) as COUNT FROM REVIEW WHERE review_type=? AND target_id=? AND user_id=?",
            [review_type, target_id, user_id]
        );
        console.log(exists_validator);
        if (exists_validator[0][0].COUNT > 0) {
            return {
                "success": false,
                "data": exists_validator[0][0],
                "message": "Review already exists"
            };
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

async function updateReview({ review_id, rating, post_content }) {
    console.log("Updating a review.");

    try {
        const UPDATE_REVIEW_QUERY = "UPDATE REVIEW SET rating=?, post_content=? WHERE review_id=?";

        const updated_review = await POOL.query(
            UPDATE_REVIEW_QUERY,
            [rating, post_content, review_id]
        );

        return {
            "success": true,
            "data": updated_review,
            "message": "Successfully updated a review."
        };

    } catch (err) {
        console.log("There was an error:", err);
        return {
            "success": false,
            "data": err,
            "message": "There was an error in updating a review."
        };
    }
}

async function deleteReview({ review_id }) {
    console.log("Deleting a review.");

    try {
        const DELETE_REVIEW_QUERY = "DELETE FROM REVIEW WHERE review_id=?";

        const deleted_review = await POOL.query(
            DELETE_REVIEW_QUERY,
            [review_id]
        )

        return {
            "success": true,
            "data": deleted_review,
            "message": `Successfully deleted a review.`
        }

    } catch (err) {
        console.log(["There was an error: ", err]);
        return {
            "success": false,
            "data": err,
            "message": `There was an error deleting a review.`
        }
    }
}

async function viewReviews({ review_type, target_id }) {
    console.log("Viewing reviews.");

    try {
        const VIEW_REVIEWS_QUERY = "SELECT * FROM REVIEW WHERE review_type=? AND target_id=?";

        const viewReviewsResult = (await POOL.query(
            VIEW_REVIEWS_QUERY,
            [review_type, target_id]
        ))[0];

        console.log(viewReviewsResult);

        return {
            "success": true,
            "data": viewReviewsResult,
            "message": "Successfully retrieved all reviews."
        }

    } catch (err) {

        console.log(["There was an error: ", err]);
        return {
            "success": false,
            "data": err,
            "message": `There was an error retrieving a review.`
        }

    }
}

async function viewReviewsByDate({ review_type, target_id }) {
    console.log("Viewing reviews by date.");


    try {
        const VIEW_REVIEWS_DATE_QUERY = "SELECT * FROM REVIEW WHERE review_type=? AND target_id=? AND DATEDIFF(NOW(), date_published)<=30";

        const viewReviewsDateResult = (await POOL.query(
            VIEW_REVIEWS_DATE_QUERY,
            [review_type, target_id]
        ))[0];

        console.log(viewReviewsDateResult);

        return {
            "success": true,
            "data": viewReviewsDateResult,
            "message": "Successfully retrieved all reviews."
        }

    } catch (err) {

        console.log(["There was an error: ", err]);
        return {
            "success": false,
            "data": err,
            "message": `There was an error retrieving a review.`
        }

    }
}

export {
    createReview,
    updateReview,
    deleteReview,
    viewReviews,
    viewReviewsByDate
}