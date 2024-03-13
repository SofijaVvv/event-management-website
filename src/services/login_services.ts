import {IUser} from "../interfaces/user";
import database from "../repository /db";
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import settings = require("../middleware/settings");
import {getPrivilagesRoles} from "./admin_services";
import {TOKEN_EXPIRES_IN} from "../middleware/settings";


async function signToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, settings.SECRET_KEY, {expiresIn: TOKEN_EXPIRES_IN}, async (error, token) => {
            if (error) {
                reject (error);
            }
            resolve (token);
        });
    });
}


async function getAdmin(roleId:number){
    const data =  await database('roles').select().where('id',roleId).first();
    if (data){
        if (data.name === "admin"){
            return true;
        }
    }
    return false;
}


export async function logIn(podaciOperatera:IUser){
    try {
        const retrievedUser = await database("user")
            .where({ email: podaciOperatera.email })
            .first();
        if (!retrievedUser) {
            return ({ error: true, message: "Invalid username or password!" });
        }

        const areSamePasswords = await bcrypt.compare(podaciOperatera.password, retrievedUser.password);
        if (!areSamePasswords) {
            return ({ error: true, message: "Invalid username or password!" });
        }

        const privileges = await getPrivilagesRoles(retrievedUser.roles_id);

        if (retrievedUser.activity == 0){
            return ({ error: true, message: "User is not active!" });
        }

        let loginPrivileges = [];
        for (let i = 0; i < privileges.length; i++) {
            let tmp = {
                route: privileges[i].route,
                can_view: false,
                can_edit: false,
            }
            for (let j = 0; j < privileges[i].value.length; j++) {
                if (privileges[i].value[j].privileges_name == 'can_view' && privileges[i].value[j].activity) {
                    tmp.can_view = true;
                }
                if (privileges[i].value[j].privileges_name == 'can_edit' && privileges[i].value[j].activity) {
                    tmp.can_edit = true;
                }
            }
            loginPrivileges.push(tmp);
        }

        const payload = { email: retrievedUser.email };
        try {
            const result = await signToken(payload);
            const userData = {
                id: retrievedUser.id,
                email: retrievedUser.email,
                name: retrievedUser.name,
                isadmin: await getAdmin(retrievedUser.roles_id)
            }
            return ({ error: false, token: result, privileges: loginPrivileges, userdata: userData });
        } catch (error) {
            return ({ error: true, message: error.message });
        }
    } catch (error) {
        return ({ error: true, message: error.message });
    }
}






