import database from "../repository /db.js";
import jwt = require("jsonwebtoken");
import settings = require("./settings.js");
import {IUser} from "../interfaces/user";
import { Request, Response, NextFunction } from 'express';
import {getPrivilagesRoles} from "../services/admin_services";


export function authenticate(request: Request, response: Response, next: NextFunction) {

    const currentMethod = request.method.toLowerCase()
    const currentUrl = request.url.split("/")[1]

    const authHeader = request.get("Authorization")
    if (!authHeader) return response.json({error: true, message: "Authorization header is missing"})

    const token = authHeader.split(" ")[1]
    jwt.verify(token, settings.SECRET_KEY, (error, payload) => {
        if(error) return response.status(401).json({error: true, message: error.message})

        database("user")
            .where({email: payload['email']})
            .first()
            .then((user: IUser) => {
                request.user = {id: user.id, name: user.name, email: user.email, roles_id: user.roles_id}
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

    const privileges: any = await getPrivilagesRoles(user.roles_id);
    const accessRights = privileges.find(item => item.route === currentUrl);

    if (accessRights === undefined) {
        console.log("You don't have access to this route")
        return false;
    } else {
        const can_view = accessRights.value.find((item: any) => item.privileges_name === 'can_view').activity;
        const can_edit = accessRights.value.find((item: any) => item.privileges_name === 'can_edit').activity;
        if (currentMethod === 'get' && can_view === 1) {
            console.log("You have access to this route")
            return true;
        } else if (currentMethod === 'post' && can_edit === 1) {
            console.log("You have access to this route")
            return true;
        } else {
            console.log("You don't have access to this route")
            return false;
        }
    }

}
