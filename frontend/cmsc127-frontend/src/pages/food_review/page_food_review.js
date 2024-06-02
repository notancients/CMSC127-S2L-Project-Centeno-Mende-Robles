import { Link } from "react-router-dom"

function FoodReview({data}) {
    let headers = ['ID', 'Name', 'Location', 'Hours', 'Food', 'Reviews'];


    return(
    <table>
        <thead>
            <tr>
            {headers.map( (element) => {
                return <th key={`${element}-header`}>{element}</th>
            })}
            </tr>
        </thead>
        <tbody>
            {data.map( (item) => {
                return <tr key={`${item.establishment_id}${item.establishment_name}`}>
                    <td>{item.establishment_id}</td>
                    <td>{item.establishment_name}</td>
                    <td>{item.establishment_location}</td>
                    <td>{item.operating_hours}</td>
                    <td><ViewFoodRedirect establishment_id={item.establishment_id}/></td>
                </tr>
            } )}
        </tbody>
    </table>
    )
}

export default FoodReview;