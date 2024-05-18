import {
    createReview,
    updateReview,
    deleteReview
} from "../review/review_controller.js";

async function createReviewAPI(req, res) {
    console.log("Create review API has been called.");

    const createReview_result = await createReview(req.body);
    
    if(createReview_result.success) {
        res.status(200).json(createReview_result);
    } else {
        res.status(500).json(createReview_result);
    }
}

async function updateReviewAPI(req, res) {
    console.log("Update review API has been called.");

    const updateReview_result = await updateReview(req.body);
    
    if(updateReview_result.success) {
        res.status(200).json(updateReview_result);
    } else {
        res.status(500).json(updateReview_result);
    }
}

async function deleteReviewAPI(req, res) {
    console.log("Delete review API has been called.");

    const deleteReview_result = await deleteReview(req.body);
    
    if(deleteReview_result.success) {
        res.status(200).json(deleteReview_result);
    } else {
        res.status(500).json(deleteReview_result);
    }
}

export {
    createReviewAPI,
    updateReviewAPI,
    deleteReviewAPI
}