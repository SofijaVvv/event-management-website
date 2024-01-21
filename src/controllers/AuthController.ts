import database from "../../config/db.js";
import jwt = require("jsonwebtoken");
import settings = require("../../config/settings.js");
import bcrypt = require("bcrypt");
import {IUser} from "../../Interface.js";


export function authenticate(request, response, next) {
    const authHeader = request.get("Authorization")
    const token = authHeader.split(" ")[1]

    jwt.verify(token, settings.SECRET_KEY, (error, payload) => {
        if(error) return response.json({error: true, message: error.message})
        console.log(payload,"payload")
        database("operater")
            .where({email: payload.email})
            .first()
            .then(user => {
                request.user = user
                next()
            })
    })
}

export async function createUser(request, response){
    const reqBody = request.body // "const user" mi govori da je ovo User model, dok je "request.body" samo objekat koji je stigao sa klijenta
    const retrievedUser = await database('operater').where('email', reqBody.email).select('*').first()
    if (retrievedUser) {
        return response.json({error: true, message: "User already exists!"});
    }
    bcrypt.hash(reqBody.password, 12)
        .then(async hashed_password => {
            try {
                const podaci_za_upis: IUser = {
                    id: 0,
                    email: reqBody.email,
                        password: hashed_password,
                        kljuc: "1232",
                        aktivan: reqBody.aktivan,
                        ime: reqBody.ime,
                        telefon: reqBody.telefon,
                        admin: reqBody.admin,
                        firma_id: reqBody.firma_id
                }
                const insertedIds = await database("operater")
                    .insert(podaci_za_upis);
                podaci_za_upis.id = insertedIds[0];
                response.json(podaci_za_upis);
            } catch (error_1) {
                response.json({error: error_1.message});
            }
        })
}
export async function logIn(request,response){
    try {
        const reqBody = request.body;

        //predlog: prebaciti ovaj kod u neku funkciju koja ce se zvati "getUserByEmail"
        // + da se ta funkcija nalazi u nekom fajlu za rad sa bazom (UserRepository.js)
        // google "repository pattern"
        const retrievedUser = await database("operater")
            .where({ email: reqBody.email })// nema potrebe nazivati email field kao "username"
            .first();
        if (!retrievedUser) {
            return response.json({ error: true, message: "Invalid username or password!" });
        }

        const areSamePasswords = await bcrypt.compare(reqBody.password, retrievedUser.password);
        if (!areSamePasswords) {
            return response.json({ error: true, message: "Invalid username or password!" });
        }

        const payload = { email: retrievedUser.email };
        jwt.sign(payload, settings.SECRET_KEY, (error, token) => {
            if (error) {
                return response.json({ error: true, message: error.message });
            }
            response.send({ error: false, token });
        });
    } catch (error) {
        response.json({ error: true, message: error.message });
    }
}