// import { Form, Link } from "react-router-dom"
// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from "react";
// import axios from "axios";

// import ENV from '../../env.js';


// let { SERVER, HEADER } = ENV;

// function CreateEstablishmentReview() {

//     const food_name = "nuggets"
//     const { establishment_id } = useParams();
//     const establishment_name = {};

//     const [name, setName] = useState('');
//     const [rating, setRating] = useState(0);
//     const [reviewText, setReviewText] = useState('');

//     useEffect(() => {
//         console.log("Fetching establishments data.");
//         const fetchReviews = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://${SERVER}/api/view-reviews?target_id=${parseInt(establishment_id)}&review_type=1`,
//                 );
//                 console.log(response);
//                 setEstablishmentReview(response.data.data);
//             } catch (err) {
//                 console.log(err);
//             }
//         }

//         fetchReviews();
//     }, []);


//     const handleSubmit = (event) => {
//         event.preventDefault();

//         // Here you would typically process the form data
//         // This could involve sending it to a server-side API
//         console.log('Review submitted:', { name, rating, reviewText });

//         // Clear the form after submission (optional)
//         setName('');
//         setRating(0);
//         setReviewText('');
//     };
//     const handleSliderChange = (event) => {
//         setRating(parseFloat(event.target.value));
//     };

//     const handleInputChange = (event) => {
//         const newRating = parseFloat(event.target.value);
//         if (isNaN(newRating) || newRating < 1 || newRating > 5) {
//             return; // Prevent invalid input
//         }
//         setRating(newRating);
//     };


//     console.log("CREATE A REVIEWWWW: ", establishment_id);
//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <h2>Write a Review id: {establishment_name}  {food_name}</h2>
//                 <label htmlFor="name">Your Name:</label>
//                 <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//                 <label htmlFor="rating">Rating:</label>
//                 <div className="rating-container">
//                     <input
//                         type="range"
//                         id="rating"
//                         min={1}
//                         max={5}
//                         step={0.1}
//                         value={rating}
//                         onChange={handleSliderChange}
//                         required
//                     />
//                     <input
//                         type="number"
//                         id="rating-input"
//                         min={1}
//                         max={5}
//                         step={0.1} // Match step of slider for decimal values
//                         value={rating.toFixed(1)} // Display rating value with one decimal
//                         onChange={handleInputChange}
//                     />
//                     <span className="rating-value">{rating.toFixed(1)}</span>
//                 </div>
//                 <label htmlFor="rating">Rating:</label>
//                 <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
//                     <option value="0">-- Select Rating --</option>
//                     <option value="1">1 Star</option>
//                     <option value="2">2 Stars</option>
//                     <option value="3">3 Stars</option>
//                     <option value="4">4 Stars</option>
//                     <option value="5">5 Stars</option>
//                 </select>
//                 <label htmlFor="reviewText">Review Text:</label>
//                 <textarea
//                     id="reviewText"
//                     value={reviewText}
//                     onChange={(e) => setReviewText(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Submit Review</button>
//             </form>
//         </>
//     )
// }

// export default CreateEstablishmentReview;