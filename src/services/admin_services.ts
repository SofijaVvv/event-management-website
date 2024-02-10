import database from "../repository /db.js";
import bcrypt = require("bcrypt");
import {IUser} from "../interfaces/user.js";
import {IRoles} from "../interfaces/roles";
import {IApplication} from "../interfaces/app";
import {IPrivileges} from "../interfaces/privileges";
import {IPrivilegesRoles} from "../interfaces/privilages_roles";
import sendMail from './mail_service';
function generatePassword(length: number, minLowercase: number, minUppercase: number, minDigits: number, minSymbols: number): string {

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digitChars = '0123456789';
    const symbolChars = '!@#$%^&*()-_=+[]{}<>,.?/';

    let password = '';

    // Ensure minimum lowercase
    for(let i=0; i<minLowercase; i++) {
        password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    }

    // Ensure minimum uppercase
    for(let i=0; i<minUppercase; i++) {
        password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    }

    // Ensure minimum digits
    for(let i=0; i<minDigits; i++) {
        password += digitChars.charAt(Math.floor(Math.random() * digitChars.length));
    }

    // Ensure minimum symbols
    for(let i=0; i<minSymbols; i++) {
        password += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));
    }

    // Generate remaining characters
    const remainingLength = length - minLowercase - minUppercase - minDigits - minSymbols;
    for(let i=0; i<remainingLength; i++) {
        const charSet = lowercaseChars + uppercaseChars + digitChars + symbolChars;
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    // Shuffle the password
    password = shuffleString(password);

    return password;

}

// Fisher-Yates shuffle
function shuffleString(str: string): string {
    let arr = str.split('');
    for(let i=arr.length-1; i>0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}





export async function createUser(userInfo: IUser){
    console.log(userInfo,"reqBody")
    const retrievedUser = await database('user')
        .where('email', userInfo.email)
        .select('*').first()
    if (retrievedUser) {
        return {error: true, message: "User already exists!"};
    }


   const generated_password  = generatePassword(12, 2, 2, 1, 1);
console.log('generisan password', userInfo.password)
    const hashed_password = await bcrypt.hash(generated_password, 12)
            try {
                userInfo.password = hashed_password;
                const insertedIds = await database("user")
                    .insert(userInfo);

                let email_subject = "Your password for the Application Dogadjaji"
                let email_body = `Your credentials for the Application Dogadjaji are: \n email: ${userInfo.email} \n password: ${generated_password} \n Please change your password after first login! \n Thank you! \n`
                  await sendMail(userInfo.email, email_subject,email_body)
                    .then(r => {
                        if (r.error){
                            return {error: true, message: " Client inserted but mail is not sent!"};
                        }
                        console.log("povratno", r);
                    });

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

    return ({ error: false, message: 'User updated!' });

}

///////////////////////////////////ULOGE///////////////////////////////////////


export async function getRoles():Promise<IRoles[]>{
    return database('roles').select().orderBy([{ column : "name",order: "asc"}])
        .then((rows:IRoles[]) => {
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
    const privileges = await getPrivilages() as IPrivileges[];

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
    return database('app').select().orderBy([{column: "app_name", order: "asc"}]).then((rows:IApplication) => {
        return (rows);
    })
}

async function getPrivilages(): Promise<IPrivileges[]>{
    return database('privileges').select().orderBy([{column: "privileges_name", order: "asc"}]).then((rows:IPrivileges) => {
        return (rows);
    })
}

export async function editPrivileges(updatePrivilege:IPrivilegesRoles){
   try {
       console.log(updatePrivilege, "updatePrivilege")
       await database("roles_privileges")
           .where("roles_id", '=',  updatePrivilege.roles_id)
           .andWhere(  "privileges_id",'=', updatePrivilege.privileges_id)
           .andWhere("app_id", '=', updatePrivilege.app_id)
           .update(updatePrivilege);

       return ({ error: false, message: 'Privilege is updated' });

   } catch (error) {
       console.error('Error changing privileges:', error);
       return ({error: true, message: 'Error changing privileges'});
   }

}

export async function getPrivilagesRoles(roles_id: number): Promise<IPrivilegesRoles[]>{
    return database.from('roles as u')
        .join('roles_privileges as up', 'u.id', '=', 'up.roles_id')
        .join('privileges as p', 'up.privileges_id', '=', 'p.id')
        .join('app as a', 'up.app_id', '=', 'a.id')
        .where('u.id', '=', roles_id)
        .select('u.name', 'p.privileges_name', 'a.app_name', 'a.app_route', 'u.id as roles_id', 'p.id as privileges_id', 'a.id as app_id', 'up.activity')
        .orderBy(['a.app_name','p.privileges_name'])
        .then((rows) => {
            const grouped = rows.reduce((acc, cur) => {
                const appName = cur.app_name;
                const appRoute = cur.app_route;
                if (!acc[appName] && acc) {
                    acc[appName] = {route: appRoute, value: []};
                }
                acc[appName].value.push({
                    privileges_name: cur.privileges_name,
                    roles_id: cur.roles_id,
                    privileges_id: cur.privileges_id,
                    app_id: cur.app_id,
                    activity: cur.activity
                });

                return acc;
            }, {});
            const result = [];
            for (const key in grouped){
                result.push({key, route: grouped[key].route, value: grouped[key].value});
            }

            return (result);
        })
}