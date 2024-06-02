import express from 'express';
import router from './server/router.js'
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static('static_html'));
// app.use(express.static('static_js'));

app.use(router);

app.listen(
    process.env.PORT,
    () => console.log("Listening on port: ", process.env.PORT)
)