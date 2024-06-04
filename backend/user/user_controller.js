import { POOL, KEY } from "../server/pool.js";

const ENCRYPTION_KEY = `${KEY}`;

async function createUser({ first_name, last_name, username, user_password }) {
    console.log("Creating a user.");


    try {
        // const HASH_QUERY = `AES_ENCRYPT(?, '${KEY}')`
        // const HASHED_PASSWORD = await POOL.query(`SELECT CONCAT(AES_ENCRYPT(?, '${ENCRYPTION_KEY}'))`, [user_password]);

        const existing_user = await POOL.query(
            "SELECT COUNT(*) AS count FROM USER WHERE username=?",
            [username]
        );

        console.log(existing_user);

        const existing_count = existing_user[0][0].count;
        console.log(existing_count);
        if (existing_count != 0) {
            return {
                "success": false,
                "data": "Exists already",
                "message": "A user exists with that username already."
            }
        }

        const QUERY = "INSERT INTO USER(first_name, last_name, username, user_password) VALUES(?, ?, ?, AES_ENCRYPT(?, 'key'))";
        // console.log(HASHED_PASSWORD, "\n","\n");
        const created_user = await POOL.query(
            QUERY,
            [first_name, last_name, username, user_password]
        );

        return {
            "success": true,
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


async function login({ username, user_password }) {
    console.log(`${username} is logging in.`);

    try {
        //////////////////////////////////////////////////////////////////////
        // check if the user exists                                         //
        //////////////////////////////////////////////////////////////////////

        const existing_user = await POOL.query(
            "SELECT COUNT(*) AS count FROM USER WHERE username=?",
            [username]
        );

        const existing_count = existing_user[0][0].count;
        if (existing_count == 0) {
            return {
                "success": false,
                "data": "Doesn't exist",
                "message": "A user with that username does not exist."
            }
        }

        //////////////////////////////////////////////////////////////////////
        // verify the password                                              //
        //////////////////////////////////////////////////////////////////////

        const LOGIN_QUERY = "SELECT user_password FROM USER WHERE username=?";
        const login_query_result = await POOL.query(
            LOGIN_QUERY,
            [username]
        );

        let user_details = login_query_result[0][0];

        let encrypt_user_query = await POOL.query(
            "SELECT AES_ENCRYPT(?, ?)",
            [user_password, ENCRYPTION_KEY]
        );

        encrypt_user_query = encrypt_user_query[0][0]

        // console.log(encrypt_user_query, user_details);

        let pass_a = Object.entries(user_details)[0][1];
        let pass_b = Object.entries(encrypt_user_query)[0][1];

        pass_a = pass_a.toString('utf8')
        pass_b = pass_b.toString('utf8')

        if (pass_a != pass_b) {
            return {
                "success": false,
                "data": null,
                "message": "Incorrect password"
            };
        } else {
            let details = await POOL.query(
                "SELECT user_id, first_name, last_name, user_type FROM USER WHERE username=?",
                [username]
            );

            return {
                "success": true,
                "data": details[0][0],
                "message": `${username} has succesfully logged in.`
            }
        }

    } catch (err) {

        console.log(["There was an error:", err]);

        return {
            "success": false,
            "data": err,
            "message": `There was an error with logging in for: ${username}.`
        }
    }
}

export {
    createUser,
    login
}