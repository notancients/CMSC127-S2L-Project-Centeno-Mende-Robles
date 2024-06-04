import { Link } from "react-router-dom"

function EstablishmentTable({ data }) {
    console.log(data);
    let headers = ['ID', 'Name', 'Location', 'Hours', 'Rating', 'Food', 'Reviews'];

    function ViewFoodRedirect({ establishment_id }) {

        return (
            <Link to={`/food-by-establishment/${establishment_id}`}>View Food</Link>
        )
    }

    function ViewEstablishmentReviewRedirect({ establishment_id }) {
        return (
            <Link to={`/establishment-review/${establishment_id}`}>View Reviews</Link>
        )
    }

    return (
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
                    return <tr key={`${item.establishment_id}${item.establishment_name}`}>
                        <td>{item.establishment_id}</td>
                        <td>{item.establishment_name}</td>
                        <td>{item.establishment_location}</td>
                        <td>{item.operating_hours}</td>
                        <td>{item.rating ? item.rating : "N/A"}</td>
                        <td><ViewFoodRedirect establishment_id={item.establishment_id} /></td>
                        <td><ViewEstablishmentReviewRedirect establishment_id={item.establishment_id} /></td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default EstablishmentTable;