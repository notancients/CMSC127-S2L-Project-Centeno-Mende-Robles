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

export {
    createEstablishment
}