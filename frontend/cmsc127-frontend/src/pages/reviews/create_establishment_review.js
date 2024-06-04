import { Form, Link } from "react-router-dom"
import { useParams,useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

import ENV from '../../env.js';
let { SERVER, HEADER } = ENV;

function CreateEstablishmentReview() {
    const navigate = useNavigate();

    let user_id = sessionStorage.getItem("user_id");

    const { establishment_id } = useParams();
    const [establishment_info, setEstablishmentInfo] = useState({});

    const [rating, setRating] = useState(0);
    const [ratingTxt, setRatingTxt] = useState('');
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        console.log("Fetching establishments data.");
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `http://${SERVER}/api/get-establishment-by-id?establishment_id=${establishment_id}`
                );
                setEstablishmentInfo({ name: response.data.data[0].establishment_name, location: response.data.data[0].establishment_location, operating_hours: response.data.data[0].operating_hours });
            } catch (err) {
                console.log(err);
            }
        }

        fetchReviews();
    }, []);

    useEffect(() => {
        let desc = "";
        if (rating < 2) {
            desc = "Poor ⭐";
        } else if (rating >= 2 && rating < 3) {
            desc = "Marginal ⭐⭐";
        } else if (rating >= 3 && rating < 4) {
            desc = "Acceptable ⭐⭐⭐";
        } else if (rating >= 4 && rating < 5) {
            desc = "Good ⭐⭐⭐⭐";
        } else if (rating === 5) {
            desc = "Excellent ⭐⭐⭐⭐⭐";
        }
        setRatingTxt(desc);
    }, [rating]);


    /*Submit to query the review */
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            let request_body = { "rating": rating, "post_content": reviewText, "user_id": parseInt(user_id), "review_type": 1, "target_id": parseInt(establishment_id) };

            console.log("console request body:", request_body);

            let response = await axios.post(
                `http://${SERVER}/api/create-review`,
                request_body
            )
            if (response.data.data) {
                alert("You have successfully submitted a review.");
                navigate(-1);
            };

        } catch (err) {
            console.log(["There was an error:", err]);
            alert("You have already submitted a review.");
        }

        // Clear the form after submission (optional)
        setRating(0);
        setReviewText('');
        navigate(-1);
    };

    const handleSliderChange = (event) => {
        setRating(parseFloat(event.target.value));
    };

    const handleInputChange = (event) => {
        const newRating = parseFloat(event.target.value);
        if (isNaN(newRating) || newRating < 1 || newRating > 5) {
            return; // Prevent invalid input
        }
        setRating(newRating);
    };

    useEffect(() => {
        let desc = "";
        if (rating < 2) {
            desc = "Poor ⭐";
        } else if (rating >= 2 && rating < 3) {
            desc = "Marginal ⭐⭐";
        } else if (rating >= 3 && rating < 4) {
            desc = "Acceptable ⭐⭐⭐";
        } else if (rating >= 4 && rating < 5) {
            desc = "Good ⭐⭐⭐⭐";
        } else if (rating === 5) {
            desc = "Excellent ⭐⭐⭐⭐⭐";
        }
        setRatingTxt(desc);
    }, [rating]);

    return (
    <>
    <div className="container">
        <div>
            <div className="establishment-info-card">
                <h1>How would you rate {establishment_info.name}?</h1>
                <p>Location: {establishment_info.location}</p>
                <p>Operating hours: {establishment_info.operating_hours}</p>
            </div>
            <div className="review-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="rating">Rating:</label>
                    <div className="rating-container">
                        <input
                            type="range"
                            id="rating"
                            min={1}
                            max={5}
                            step={0.1}
                            value={rating}
                            onChange={handleSliderChange}
                            required
                        />
                        <input
                            type="number"
                            id="rating-input"
                            min={1}
                            max={5}
                            step={0.1}
                            value={rating.toFixed(1)}
                            onChange={handleInputChange}
                        />
                        <span className="rating-value">{ratingTxt}</span>
                    </div>
                    <label htmlFor="reviewText">Review Text:</label>
                    <textarea
                        id="reviewText"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    </div>
    </>
    )
}

export default CreateEstablishmentReview;