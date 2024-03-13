import {IUser} from "../interfaces/user";
import {logIn} from "../services/login_services";
import express from "express";
import {generateOTPSecret} from "../services/otp_service";


const loginrouter = express.Router()

loginrouter.post("/login", async (request, response) => {
     const podaciOperatera: IUser = request.body;
    console.log(await generateOTPSecret())
    await logIn(podaciOperatera).then(result => {
        response.json(result)
    });
});


export default loginrouter