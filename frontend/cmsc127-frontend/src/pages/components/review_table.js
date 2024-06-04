import { Link } from "react-router-dom"
import { useState } from "react";
import axios from 'axios';
import {MdDelete as Delete} from 'react-icons/md'

function UpdateForm({ toggleModal, renderTable, targetId }) {
    const [establishmentName, setEstablishmentName] = useState("");
    const [establishmentLocation, setEstablishmentLocation] = useState("");
    const [operatingHours, setOperatingHours] = useState("");


    async function handleOnSubmit(event) {
        event.preventDefault();
        console.log(establishmentName, establishmentLocation, operatingHours);

        try {
            let request_body = {
                "establishment_id": targetId,
                "establishment_name": establishmentName,
                "establishment_location": establishmentLocation,
                "operating_hours": operatingHours
            };

            // console.log(request_body);

            let response = await axios.patch(
                `http://${SERVER}/api/update-establishment`,
                request_body,
                HEADER
            )



            if (response.data.success) {
                renderTable();
                toggleModal();
                alert("Succesfully updated establishment");
            }
        } catch (err) {
            console.log(["There was an error:", err]);
        }
    }

    function handleOnChange(event, setFunction) {
        setFunction(event.target.value);
    }

    return (
        <form onSubmit={(e) => handleOnSubmit(e)}>
            <label> Establishment Name:
                <input type="text" onChange={(e) => handleOnChange(e, setEstablishmentName)}></input>
            </label>
            <label> Establishment Location:
                <input type="text" onChange={(e) => handleOnChange(e, setEstablishmentLocation)}></input>
            </label>
            <label> Operating Hours:
                <input type="text" onChange={(e) => handleOnChange(e, setOperatingHours)}></input>
            </label>
            <button type="submit">Search</button>
        </form>
    )
}

function ReviewTable({data}) {
    let headers = ['ID', "Rating", "Post Content", "Date Published", "Delete"]

    async function handleUpdateReview(review_id) {

        try {

            let request_body = (
                "review_id"
            );

            let updateReview_result = await axios.patch(
                `http://${SERVER}/api/update-review`
            )

        } catch (err) {
            console.log(["There was an error:", err]);
        }

    }

    const [open, setModal] = React.useState(false);
    const [targetId, setTargetId] = useState(null);

    function toggleModal(targetId) {
        setTargetId(targetId);
        setModal(!open);
    }

    async function handleDelete(establishment_id) {
        console.log(establishment_id);
        try {
            let request_body = {
                "establishment_id": establishment_id
            };

            let response = await axios.post(
                `http://${SERVER}/api/delete-establishment`,
                request_body
            )

            console.log(response);

            if (response.data.success) {
                alert("Successfully deleted establishment");
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
                    <td></td>
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