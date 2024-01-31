import database from "../repository /db.js";
import jwt = require("jsonwebtoken");
import settings = require("./settings.js");
import {IUser} from "../interfaces/user";

export function authenticate(request, response, next) {
    if (process.env.NODE_ENV === 'test' && process.env.SKIP_MIDDLEWARE === 'true') {
        return next();
    }

    const authHeader = request.get("Authorization")
    const token = authHeader.split(" ")[1]
    jwt.verify(token, settings.SECRET_KEY, (error, payload) => {
        if(error) return response.json({error: true, message: error.message})
        database("user")
            .where({email: payload.email})
            .first()
            .then((user: IUser) => {
                request.user = user
                next()
            })
    })
}

