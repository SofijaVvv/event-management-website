import database from "../repository /db.js";
import bcrypt = require("bcrypt");
import {IUser} from "../interfaces/user.js";
import {IRoles} from "../interfaces/roles";
import {IApplication} from "../interfaces/app";
import {IPrivilages} from "../interfaces/privileges";
import {IPrivilegesRoles} from "../interfaces/privilages_roles";
import { Response } from "express-serve-static-core";

export async function createUser(userInfo: IUser){
    console.log(userInfo,"reqBody")
    const retrievedUser = await database('user')
        .where('email', userInfo.email)
        .select('*').first()
    if (retrievedUser) {
        return {error: true, message: "User already exists!"};
    }
    const hashed_password = await bcrypt.hash(userInfo.password, 12)
            try {
                userInfo.password = hashed_password;
                const insertedIds = await database("user")
                    .insert(userInfo);
                return {error: false, message: insertedIds[0]};
            } catch (error_1) {
                return {error: true, message: error_1.message};
            }
}

///////////////////////////////////USER///////////////////////////////////////

export async function getUsers():Promise<IUser[]>{
    return database('user').select().orderBy([{ column : "name",order: "asc"}]).then((rows: any) => {
        return (rows);
    })
}

export async function editUser(updateUser:IUser){
    console.log(updateUser,"updateUser")
    if (!updateUser.id) {
        return ({ error: true, message: 'User does not exist' });
    }
    const retrievedUser = await database('user').where('id', updateUser.id).select('*').first()
    if (!retrievedUser) {
        return ({error: true, message: "User does not exist!"});
    }
    await database("user")
        .where("id", updateUser.id)
        .update(updateUser);

    return ({ error: true, message: 'User updated!' });

}

///////////////////////////////////ULOGE///////////////////////////////////////


export async function getRoles():Promise<IRoles[]>{
    return database('roles').select().orderBy([{ column : "uloge_naziv",order: "asc"}]).then((rows) => {
        return (rows);
    })
}



export async function addRoles(newRole:IRoles){
    try{
        const insertedIds = await database("roles")
            .insert(newRole);
        newRole.id= insertedIds[0];
        await addPrivileges(newRole.id);
        return ({error: false, message: newRole.id});
    } catch (error) {
        console.error('Error while adding role:', error);
       return ({ error: true, message: 'Error while adding role' });
    }

}

export async function editRoles(updateRole:IRoles, ){
    try{
        await database("roles")
            .where("id", updateRole.id)
            .update(updateRole);
       return ({ error: false, message: 'Role is updated' });

    } catch (error) {
        console.error('Error changing role:', error);
        return ({error: true, message: 'Error changing role'});

    }
}

///////////////////////////////////PRIVILEGIJE///////////////////////////////////////


export async function addPrivileges(role_id: number) {
    const applications = await getApplication() as IApplication[];
    const privileges = await getPrivilages() as IPrivilages[];

    for (let i = 0; i < applications.length; i++) {
        const app = applications[i];
        console.log(app.app_name, "app")
        for (let j = 0; j < privileges.length; j++) {
            const new_privilege  = {
                roles_id: role_id,
                privileges_id: privileges[j].id,
                app_id: app.id,
                activity: false
            }
            await database("roles_privileges")
                .insert(new_privilege);
            console.log(new_privilege, "new_privilege")
        }
    }
    return true;
}


async function getApplication(): Promise<IApplication[]>{
    return database('app').select().orderBy([{column: "app_name", order: "asc"}]).then((rows) => {
        return (rows);
    })
}

async function getPrivilages(): Promise<IPrivilages[]>{
    return database('privileges').select().orderBy([{column: "privileges_name", order: "asc"}]).then((rows) => {
        return (rows);
    })
}

export async function getPrivilagesRoles(roles_id: number): Promise<IPrivilegesRoles[]>{
    return database.from('roles as u')
        .join('roles_privileges as up', 'u.id', '=', 'up.roles_id')
        .join('privileges as p', 'up.privileges_id', '=', 'p.id')
        .join('app as a', 'up.app_id', '=', 'a.id')
        .where('u.id', '=', roles_id)
        .select('u.roles_name', 'p.privileges_name', 'a.app_name', 'u.id as uid', 'p.id as pid', 'a.id as aid', 'up.activity')
        .orderBy(['a.app_name', 'p.privileges_name']).then((rows) => {
            const grouped = rows.reduce((acc, cur) => {
                if (!acc[cur.app_name]) {
                    acc[cur.app_name] = [];
                }
                acc[cur.app_name].push({
                    privileges_name: cur.privileges_name,
                    uid: cur.uid,
                    pid: cur.pid,
                    aid: cur.aid,
                    activity: cur.activity
                });

                return acc;
            }, {});
            return (grouped);
        })
}