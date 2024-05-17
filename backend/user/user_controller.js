import { POOL, KEY } from "../server/pool.js";

const ENCRYPTION_KEY = `${KEY}`;

async function createUser({first_name, last_name, username, user_password}) {
    console.log("Creating a user.");

    
    try {
        // const HASH_QUERY = `AES_ENCRYPT(?, '${KEY}')`
        // const HASHED_PASSWORD = await POOL.query(`SELECT CONCAT(AES_ENCRYPT(?, '${ENCRYPTION_KEY}'))`, [user_password]);
        // console.log(HASHED_PASSWORD, "\n","\n");
        const QUERY = "INSERT INTO USER(first_name, last_name, username, user_password) VALUES(?, ?, ?, AES_ENCRYPT(?, 'key'))";

        const created_user = await POOL.query(
            QUERY,
            [first_name, last_name, username, user_password]
        );

        return {
            "success":true,
            "data": created_user,
            "message": "A user has been successfully created."
        }

    } catch (err) {
        console.log(["There was an error:", err]);
        return {
            "success": false,
            "data": err,
            "message": "There was an error with creating a user."
        }
    }
}

export {
    createUser
}