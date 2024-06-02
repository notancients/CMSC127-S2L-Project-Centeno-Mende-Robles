import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

import ENV from '../../env.js';

let {SERVER, HEADER} = ENV;

function EstablishmentReview({data}) {
    let headers = ['ID', 'Rating', 'Post Content', 'Date Published'];

    const {establishment_id} = useParams();
    console.log(establishment_id);

    const [establishmentReview, setEstablishmentReview] = useState([]);

    useEffect( () => {
        console.log("Fetching establishments data.");
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `http://${SERVER}/api/view-reviews?target_id=${parseInt(establishment_id)}&review_type=1`,
                );
                console.log(response);
                setEstablishmentReview(response.data.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchReviews();
    }, []);

    return(
    <>
    <div className="container">
    <table>
        <thead>
            <tr>
            {headers.map( (element) => {
                return <th key={`${element}-header`}>{element}</th>
            })}
            </tr>
        </thead>
        <tbody>
            {establishmentReview.map( (item) => {
                return <tr key={`${item.review_id}`}>
                    <td>{item.review_id}</td>
                    <td>{item.rating}</td>
                    <td>{item.post_content}</td>
                    <td>{item.date_published}</td>
                </tr>
            } )}
        </tbody>
    </table>
    </div>
    </>
    )
}

export default EstablishmentReview;