import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });

const SQL_HOST = process.env.SQL_HOST;
const SQL_USER = process.env.SQL_USER;
const SQL_PASSWORD = process.env.SQL_PASSWORD;
const SQL_DATABASE = process.env.SQL_DATABASE;

console.log(SQL_DATABASE, SQL_HOST, SQL_PASSWORD,SQL_USER);

console.log("Initializing pool.");
const POOL = mysql.createPool({
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DATABASE
}).promise();
console.log("Pool has been created.");

POOL.query("Create table sampletable")

// async function viewAllUsers() {
//     let allUsers = await POOL.query("SELECT * from user");
//     console.log(allUsers);
// // }

// let allUsers = await POOL.query("SELECT * from `user`");
// console.log(allUsers);