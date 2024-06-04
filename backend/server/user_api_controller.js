import {
    createUser,
    login
} from "../user/user_controller.js";




async function createUserAPI(req, res) {
    console.log("Create user API has been called.");

    const createUser_result = await createUser(req.body);

    if(createUser_result.success) {
        res.status(200).json(createUser_result);
    } else {
        res.status(500).json(createUser_result);
    }
    
}

async function loginAPI(req, res) {
    console.log("Login API has been called.");

    const login_result = await login(req.body);

    if(login_result.success) {
        res.status(200).json(login_result);
    } else {
        res.status(500).json(login_result);
    }
    
}

export {
    createUserAPI,
    loginAPI
}