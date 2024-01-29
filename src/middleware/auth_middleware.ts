import database from "../repository /db.js";
import jwt = require("jsonwebtoken");
import settings = require("./settings.js");



export function authenticate(request, response, next) {
    const authHeader = request.get("Authorization")
    const token = authHeader.split(" ")[1]
    jwt.verify(token, settings.SECRET_KEY, (error, payload) => {
        if(error) return response.json({error: true, message: error.message})
        database("user")
            .where({email: payload.email})
            .first()
            .then(user => {
                request.user = user
                next()
            })
    })
}

