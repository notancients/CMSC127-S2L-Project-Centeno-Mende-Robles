
# CMSC-127-S2L-Project

A simple review system for restaurants and their offered food selection.

Uses MySQL, Express, React. NodeJs.

## Installation
*This guide assumes that the user has successfully navigated to the home directory of the project. Additionally, it assumes that the user MySQL and NodeJs installed already.*

1.) Setup the MySQL database. Under the main directory, run the *database_clone.sql* in your MySQL terminal. Alternatively, the user may choose to initialize an empty database. Use the *backend/database_controller/database_init.sql* file to do so.

2.) Setup the dependencies for the frontend and the backend. Open two terminals. For the backend folder, simply go to the root folder by navigating with *cd backend*. For the frontend folder, navigate using *cd frontend/cmsc127-frontend*.
Run the following commands in their respective terminals.

Backend
```bash
    cd backend
    npm install
```
Frontend
```bash
    cd frontend/cmsc127-frontend
    npm install
```

3.) To run the program, first run the backend server and then the frontend server.

Backend
```bash
    node index.js
```
Frontend
```bash
    npm run start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file located in *backend/.env*

This is the address of your MySQL server. Usually some variation of your localhost.

`SQL_HOST`


This is your main user for your SQL server. Typically the root or a user with the relevant priveleges (i.e. CREATE, UPDATE, etc...)

`SQL_USER`


The accompanying password for your selected user.

`SQL_PASSWORD`

The name of the database being used for the program. Set this to *reviewapp*.

`SQL_DATABASE`

The salt/key used for encryption. Set this to *key*.

`HASH_KEY`

The port is the 'address' of your server for your localhost. Set this to *3001*.
`PORT`