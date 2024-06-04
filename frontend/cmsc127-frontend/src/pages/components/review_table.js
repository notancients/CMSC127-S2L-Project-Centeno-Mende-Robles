import { Link } from "react-router-dom"
import { useState } from "react";
import axios from 'axios';
import {MdDelete as Delete} from 'react-icons/md'
import ENV from "../../env.js"
import Modal from '../components/Modal.js';

const { SERVER, HEADER } = ENV;

function UpdateForm({ toggleModal, renderTable, targetId }) {
    const [postContent, setPostContent] = useState("");
    const [rating, setRating] = useState("");

    async function handleOnSubmit(event) {
        event.preventDefault();

        try {

            let request_body = {
                "review_id": targetId,
                "post_content": postContent,
                "rating": rating
            };

            let updateReview_result = await axios.patch(
                `http://${SERVER}/api/update-review`,
                request_body,
                HEADER
            )

            alert("Successfully updated the review.");
            renderTable();
            toggleModal();

        } catch (err) {
            console.log(["There was an error:", err]);
        }
    }

    function handleOnChange(event, setFunction) {
        setFunction(event.target.value);
    }

    return (
        <form onSubmit={(e) => handleOnSubmit(e)}>
            <label> Rating:
                <input type="number" step={0.1} onChange={(e) => handleOnChange(e, setRating)}></input>
            </label>
            <label> Post Content:
                <input type="text" onChange={(e) => handleOnChange(e, setPostContent)} placeholder="Enter your new review text here"></input>
            </label>
            <button type="submit">Update</button>
        </form>
    )
}

function ReviewTable({data, renderTable}) {
    let headers = ['ID', "Rating", "Post Content", "Date Published", "Update", "Delete"]


    const [open, setModal] = useState(false);
    const [targetId, setTargetId] = useState(null);

    function toggleModal(targetId) {
        setTargetId(targetId);
        setModal(!open);
    }

    async function handleDelete(review_id) {
        console.log("Deleting review: ", review_id);

        try {
            let request_body = {
                "review_id": review_id
            };

            let response = await axios.post(
                `http://${SERVER}/api/delete-review`,
                request_body
            )

            console.log(response);

            if (response.data.success) {
                alert("Successfully deleted a review.");
                renderTable();
            }

        } catch (err) {
            console.log(["There was an error", err]);
        }
    }

    return(
    <>
    <table>
        <thead>
            <tr>
                {headers.map((element) => {
                    return <th key={`${element}-header`}>{element}</th>
                })}
            </tr>
        </thead>
        <tbody>
            {data.map((item) => {
                return <tr key={`${item.review_type}-${item.review_id}`}>
                    <td>{item.review_id}</td>
                    <td>{item.rating}</td>
                    <td>{item.post_content}</td>
                    <td>{item.date_published}</td>
                    <td><button onClick={() => toggleModal(item.review_id)}>Update</button></td>
                    <td><Delete onClick={() => handleDelete(item.review_id)}/></td>
                </tr>
            })}
        </tbody>
    </table>
    <Modal isOpen={open} onClose={setModal}>
        <>
        <UpdateForm renderTable={renderTable} targetId={targetId} toggleModal={() => toggleModal()}/>
        <button onClick={toggleModal}>X</button>
        </>
    </Modal>
    </>
    )
}

export default ReviewTable;