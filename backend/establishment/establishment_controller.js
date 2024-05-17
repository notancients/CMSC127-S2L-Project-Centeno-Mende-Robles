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
    
    let establisment_name_param = `%${establishment_name}%`
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

async function updateEstablishment({establishment_name}) {
    console.log("Updating an establishment.");

}

async function deleteEstablishment({establishment_name}) {
    console.log("Deleting an establishment.");

    return false
}

export {
    createEstablishment,
    searchEstablishment,
    updateEstablishment,
    deleteEstablishment
}