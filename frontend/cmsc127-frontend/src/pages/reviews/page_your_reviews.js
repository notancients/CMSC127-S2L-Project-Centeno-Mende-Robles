import { useState, useEffect } from "react";
import ReviewTable from "../components/review_table";
import ENV from '../../env.js';
import axios from 'axios';

const { SERVER, HEADER } = ENV;

let user_id = sessionStorage.getItem("user_id");
function YourReviews() {

    const [establishmentReview, setEstablishmentReview] = useState([]);
    const [foodReview, setFoodReview] = useState([]);


    const fetchReviews = async () => {
        try {
            const response = await axios.get(
                `http://${SERVER}/api/get-review-by-user-id?user_id=${user_id}`,
            );

            console.log(response);
            let fetchFoodReview = [];
            let fetchEstablishmentReview = [];
            let data = response.data;

            data.data.map( (element) => {
                if (element.review_type == 0) fetchFoodReview.push(element);
                else fetchEstablishmentReview.push(element);
            });

            setEstablishmentReview(fetchEstablishmentReview);
            setFoodReview(fetchFoodReview);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log("Fetching review data.");
        fetchReviews();
    }, []);


    return(
    <>
    <div className="container">
        <div className="flex row">
            <div className="review-table flex column col-center">
                <div>Food Reviews</div>
                <ReviewTable data={foodReview} renderTable={fetchReviews}/>
            </div>
            <div className="review-table flex column col-center">
                <div>Establishment Review</div>
                <ReviewTable data={establishmentReview} renderTable={fetchReviews}/>
            </div>
        </div>
    </div>
    </>
    )
}

export default YourReviews;