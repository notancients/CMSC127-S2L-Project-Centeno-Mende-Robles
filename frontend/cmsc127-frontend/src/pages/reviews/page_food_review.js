import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import ENV from '../../env.js';

let { SERVER, HEADER } = ENV;

let review_range = ["None", "Month"];

function FoodReview({ data }) {
    let headers = ['ID', 'Rating', 'Post Content', 'Date Published'];
    const navigate = useNavigate();

    const { food_id } = useParams();

    const [foodReview, setFoodReview] = useState([]);

    const [allFoodReview, setAllFoodReview] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.log("Fetching food review data.");
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `http://${SERVER}/api/view-reviews?target_id=${parseInt(food_id)}&review_type=0`,
                );
                // console.log(response);
                setAllFoodReview(response.data.data);
                setFoodReview(response.data.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchReviews();
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleAddReview = () => {
        navigate(`/create-food-review/${food_id}`);
    };


    function handleReviewRange(timeFilter) {
        let newReviewArray = [];


        if (timeFilter === "None") {
            newReviewArray = allFoodReview;
        } else {
            const millisecondsPerDay = 1000 * 60 * 60 * 24;
            const thirtyDaysAgo = (new Date()).getTime() - (millisecondsPerDay * 30);

            allFoodReview.map((element) => {
                let date = element.date_published.substring(0, 10);
                date = date.split('-');
                date = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]))

                if (new Date(thirtyDaysAgo) - 0 <= new Date(date) - 0) {

                    newReviewArray.push(element);
                }
            })
        }

        setAllFoodReview(newReviewArray);
        setIsOpen(false);
    }

    function ReviewRangeDropdown() {
        return (
            <div className="dropdown">
                <button onClick={toggleDropdown}>Select by time range</button>
                {isOpen && (
                    <ul className="dropdown-menu">
                        {review_range.map((option) => (
                            <li key={`range_${option}`} onClick={() => handleReviewRange(option)}>
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }

    return (
        <>
            <div className="container">
                <button createClass="add-establishment-review" onClick={handleAddReview}>Judge Me</button>
                <ReviewRangeDropdown />
                <table>
                    <thead>
                        <tr>
                            {headers.map((element) => {
                                return <th key={`${element}-header`}>{element}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {foodReview.map((item) => {
                            return <tr key={`${item.review_id}`}>
                                <td>{item.review_id}</td>
                                <td>{item.rating}</td>
                                <td>{item.post_content}</td>
                                <td>{item.date_published}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default FoodReview;