import database from "../repository /db.js";
import jwt = require("jsonwebtoken");
import settings = require("./settings.js");
import {IUser} from "../interfaces/user";
import { Request, Response, NextFunction } from 'express';

import {getPrivilagesRoles} from "../services/admin_services";

export function authenticate(request: Request, response: Response, next: NextFunction) {

    // get method from request : GET or POST
    // all application routes are in lowercase
    const currentMethod = request.method.toLowerCase()
    // get url from request
    // example : /client/0
    // request.url.split("/")[0] = client/0
    // request.url.split("/")[1] = client - which is mapped in database as application path
    const currentUrl = request.url.split("/")[1]

    // if user is logged in then he must send Authorization header with Bearer token
    // Now get token from request header Bearer token
    const authHeader = request.get("Authorization")
    if (!authHeader) return response.json({error: true, message: "Authorization header is missing"})


    // split Authorization: Bearer token and get token
    const token = authHeader.split(" ")[1]
    // verify token with jwt
    jwt.verify(token, settings.SECRET_KEY, (error, payload) => {
        if(error) return response.status(401).json({error: true, message: error.message})
        database("user")
            .where({email: payload['email']})
            .first()
            .then((user: IUser) => {
                // set user to request object to be returned for the function that is called
                request.user = {id: user.id, name: user.name, email: user.email, roles_id: user.roles_id}
                // call authorize function to check if user has access to the route
                const  authResult =  authorize(user, currentUrl, currentMethod).then((authResult) => {
                    if (authResult) {
                        next()
                    } else {
                        return response.json({error: true, message: "You don't have access to this route"})
                    }
                })
            })
    })

}

export async function authorize(user:IUser, currentUrl:string, currentMethod:string) {

    // get privileges for user role
    const privileges: any = await getPrivilagesRoles(user.roles_id);
    // find route in privileges
    const accessRights = privileges.find(item => item.route === currentUrl);

    if (accessRights === undefined) {
        console.log("You don't have access to this route")
        return false;
    } else {
        // check if user has access to the route
        const can_view = accessRights.value.find((item: any) => item.privileges_name === 'can_view').activity;
        const can_edit = accessRights.value.find((item: any) => item.privileges_name === 'can_edit').activity;
        // all get requests are allowed if can_view is 1
        if (currentMethod === 'get' && can_view === 1) {
            console.log("You have access to this route")
            return true;
            // all post requests are allowed if can_edit is 1
        } else if (currentMethod === 'post' && can_edit === 1) {
            console.log("You have access to this route")
            return true;
        } else {
            console.log("You don't have access to this route")
            return false;
        }
    }

}
