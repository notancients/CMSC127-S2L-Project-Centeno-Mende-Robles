import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'Developer',
    password: 'developerpassword',
    database: 'sampledatabase'
}).promise();

const result = await pool.query("SELECT * FROM notes");

export {
    result
}