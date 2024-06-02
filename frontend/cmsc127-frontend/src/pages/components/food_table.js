import { Link } from "react-router-dom"

function FoodTable({data}) {
    let headers = ['ID', "Food Name", "Price", "Reviews"]

    function ViewFoodReviewRedirect({food_id}) {

        return (
            <Link to={`/food-review/${food_id}`}>View Reviews</Link>
        )
    
    }


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
                return <tr key={`${item.food_id}${item.food_name}`}>
                    <td>{item.food_id}</td>
                    <td>{item.food_name}</td>
                    <td>{item.price}</td>
                    <td><ViewFoodReviewRedirect food_id={item.food_id}/></td>
                </tr>
            } )}
        </tbody>
    </table>
    )
}

export default FoodTable;