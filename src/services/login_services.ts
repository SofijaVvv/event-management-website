import {IUser} from "../interfaces/user";
import database from "../repository /db";
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import settings = require("../middleware/settings");
import {response} from "express";



async function signToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, settings.SECRET_KEY, async (error, token) => {
            if (error) {
                reject (error);
            }

            resolve (token);
        });
    });
}



export async function logIn(podaciOperatera:IUser){
    try {
        const retrievedUser = await database("user")
            .where({ email: podaciOperatera.email })// nema potrebe nazivati email field kao "username"
            .first();
        if (!retrievedUser) {
            return ({ error: true, message: "Invalid username or password!" });
        }
        const areSamePasswords = await bcrypt.compare(podaciOperatera.password, retrievedUser.password);
        if (!areSamePasswords) {
            return ({ error: true, message: "Invalid username or password!" });
        }
        const payload = { email: retrievedUser.email };
        const token = await signToken(payload);
        try {
            const result = await signToken(payload);
            return ({ error: false, token: result });
        } catch (error) {
            return ({ error: true, message: error.message });
        }
    } catch (error) {
       return ({ error: true, message: error.message });
    }
}
