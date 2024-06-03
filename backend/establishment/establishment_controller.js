import { POOL } from "../server/pool.js";

async function createEstablishment({establishment_name, establishment_location, operating_hours, established_by}) {
    console.log("Creating an establishment.");

    try {
        const QUERY = "INSERT INTO ESTABLISHMENT(establishment_name, establishment_location, operating_hours, established_by) VALUES (?, ?, ?, ?)";
        let created_establishment = await POOL.query(
            QUERY,
            [establishment_name, establishment_location, operating_hours, established_by]
        );

        return {
            "success":true,
            "data": created_establishment,
            "message": "An establishment has been successfully created."
        }

    } catch (err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with creating an establishment."
        }
    }
}

async function searchEstablishment({establishment_name}) {
    console.log("Searching for an establishment.");
    
    const establisment_name_param = `%${establishment_name}%`

    try {
        const QUERY = "SELECT * FROM ESTABLISHMENT WHERE establishment_name LIKE ?";
        let searched_establishment = await POOL.query(
            QUERY,
            [establisment_name_param]
        );
        
        // console.log(searched_establishment);

        return {
            "success":true,
            "data": searched_establishment[0],
            "message": "An establishment has been successfully found."
        }

    } catch (err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with searching an establishment."
        }
    }
}

async function updateEstablishment({establishment_id, establishment_name, establishment_location, operating_hours}) {
    console.log("Updating an establishment.");

    try {
        const QUERY = "UPDATE ESTABLISHMENT SET establishment_name=?, establishment_location=?, operating_hours=? WHERE establishment_id=?";
        let updated_establishment = await POOL.query(
            QUERY,
            [establishment_name, establishment_location, operating_hours, establishment_id]
        );
        

        return {
            "success":true,
            "data": updated_establishment[0],
            "message": "An establishment has been successfully updated."
        }

    } catch (err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with updating an establishment."
        }
    }
}

async function deleteEstablishment({establishment_id}) {
    console.log("Deleting an establishment:", establishment_id);

    try {
        const QUERY = "DELETE FROM ESTABLISHMENT WHERE establishment_id=?";
        let deleted_establishment = await POOL.query(
            QUERY,
            [establishment_id]
        );
        

        return {
            "success":true,
            "data": deleted_establishment[0],
            "message": "An establishment has been successfully deleted."
        }

    } catch (err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with deleting an establishment."
        }
    }

    return false
}

// To add pagination for proper data handling, currently simply returning all data
// May 18, 6:32PM
async function viewAllEstablishment() {
    console.log("Viewing all establishments.");
    
    try {
        const VIEWALL_QUERY = "SELECT * FROM ESTABLISHMENT e LEFT JOIN (SELECT target_id, AVG(rating) FROM REVIEW WHERE review_type=1 GROUP BY target_id) r ON e.establishment_id=r.target_id GROUP BY e.establishment_id;";
        const all_establishments = await POOL.query(
            VIEWALL_QUERY,
            []
        );
        
        return {
            "success":true,
            "data": all_establishments,
            "message": "Successfully returned all establishments."
        }

    } catch (err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with retrieving the establishments."
        }
    }
}

async function viewHighlyRatedEstablishment() {
    console.log("Viewing all highly rated establishments.");

    try {
        const HIGH_RATE_QUERY = "SELECT e.*, sub.average AS rating FROM ESTABLISHMENT e NATURAL JOIN (SELECT target_id, AVG(rating) AS average FROM REVIEW WHERE review_type=1 GROUP BY target_id HAVING AVG(rating)>=4 ORDER BY target_id ASC) as sub";
        const high_rate_result = (await POOL.query(
            HIGH_RATE_QUERY
        ))[0];

        return {
            "success":true,
            "data": high_rate_result,
            "message": "Successfully returned all highly rated establishments."
        }
    } catch (err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with retrieving the highly rated establishments."
        }
    }
}

async function getEstablishmentById({establishment_id}) {
    console.log("Getting establishment by id.");

    try {
        const ESTABLISHMENT_ID_QUERY = "SELECT * FROM ESTABLISHMENT WHERE establishment_id=?";
        const establishment_id_result = (await POOL.query(
            ESTABLISHMENT_ID_QUERY,
            [establishment_id]
        ))[0];

        return {
            "success":true,
            "data": establishment_id_result,
            "message": "Successfully returned establishment for the given id."
        }
    } catch (err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with retrieving the establishment for the given id."
        }
    }
}

async function getEstablishmentByUserId({user_id}) {
    console.log("Getting establishment by user id.");

    try {
        const ESTABLISHMENT_USER_ID_QUERY = "SELECT * FROM ESTABLISHMENT WHERE established_by=?";
        const establishment_id_result = (await POOL.query(
            ESTABLISHMENT_USER_ID_QUERY,
            [user_id]
        ))[0];

        return {
            "success":true,
            "data": establishment_id_result,
            "message": "Successfully returned establishment for the given id."
        }
    } catch (err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with retrieving the establishment for the given id."
        }
    }
}

export {
    createEstablishment,
    searchEstablishment,
    updateEstablishment,
    deleteEstablishment,
    viewAllEstablishment,
    viewHighlyRatedEstablishment,
    getEstablishmentById,
    getEstablishmentByUserId
}