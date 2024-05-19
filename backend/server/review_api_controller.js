import {
    createReview,
    updateReview,
    deleteReview,
    viewReviews,
    viewReviewsByDate
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

async function viewReviewsAPI(req, res) {
    console.log("View review API has been called.");

    const viewReview_result = await viewReviews(req.body);
    
    if(viewReview_result.success) {
        res.status(200).json(viewReview_result);
    } else {
        res.status(500).json(viewReview_result);
    }
}

async function viewReviewsByDateAPI(req, res) {
    console.log("View review by date API has been called.");

    const viewReviewsByDate_result = await viewReviewsByDate(req.body);
    
    if(viewReviewsByDate_result.success) {
        res.status(200).json(viewReviewsByDate_result);
    } else {
        res.status(500).json(viewReviewsByDate_result);
    }
}



export {
    createReviewAPI,
    updateReviewAPI,
    deleteReviewAPI,
    viewReviewsAPI,
    viewReviewsByDateAPI
}