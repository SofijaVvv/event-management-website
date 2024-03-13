import database from "../repository /db.js";
import bcrypt = require("bcrypt");
import {IUser} from "../interfaces/user.js";
import {IRoles} from "../interfaces/roles";
import {IApplication} from "../interfaces/app";
import {IPrivileges} from "../interfaces/privileges";
import {IPrivilages, IPrivilegesRoles} from "../interfaces/privilages_roles";
import sendMail from './mail_service';
import QRCode from 'qrcode';
import {generateOtpQRCode, generateOTPSecret} from "./otp_service";

function generatePassword(length: number, minLowercase: number, minUppercase: number, minDigits: number, minSymbols: number): string {

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digitChars = '0123456789';
    const symbolChars = '!@#$%^&*()-_=+[]{}<>,.?/';

    let password = '';

    for (let i = 0; i < minLowercase; i++) {
        password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    }

    for (let i = 0; i < minUppercase; i++) {
        password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    }

    for (let i = 0; i < minDigits; i++) {
        password += digitChars.charAt(Math.floor(Math.random() * digitChars.length));
    }

    for (let i = 0; i < minSymbols; i++) {
        password += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));
    }

    const remainingLength = length - minLowercase - minUppercase - minDigits - minSymbols;
    for (let i = 0; i < remainingLength; i++) {
        const charSet = lowercaseChars + uppercaseChars + digitChars + symbolChars;
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    password = shuffleString(password);
    return password;
}


function shuffleString(str: string): string {
    let arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}


export async function createUser(userInfo: IUser) {
    const retrievedUser = await database('user')
        .where('email', userInfo.email)
        .select('*').first()
    if (retrievedUser) {
        return {error: true, message: "User already exists!"};
    }

    const generatedPassword = generatePassword(12, 2, 2, 1, 1);
    const generatedSecretKey = await generateOTPSecret();
    userInfo.key = generatedSecretKey.base32;
    const generatedQRCode = await generateOtpQRCode(userInfo.key, userInfo.email);
    const hashed_password = await bcrypt.hash(generatedPassword, 12)

    try {
        userInfo.password = hashed_password;
        const insertedIds = await database("user")
            .insert(userInfo);

        let email_subject = "Your password for the Application LGProject"
        let email_body = `<p>Your credentials for the Application Dogadjaji are:</p> <div>email: <b>${userInfo.email}</b></div> <div>password: <b>${generatedPassword}</b> </div><p>For one time password (OTP) download free Google or Microsoft Authentication application and  scan following QR code:</p><p><img src="${generatedQRCode}" alt="QR Code"/></p>`

        await sendMail(userInfo.email, email_subject, email_body, generatedQRCode)
            .then(r => {
                if (r.error) {
                    return {error: true, message: " Client inserted but mail is not sent!"};
                }
            });

        return {error: false, message: insertedIds[0]};

    } catch (error_1) {

        return {error: true, message: error_1.message};

    }
}


export async function resetPassword(userEmail: { email: "" }) {
    const retrievedUser = await database('user')
        .where('email', userEmail.email)
        .select('*').first()
    if (!retrievedUser) {
        return {error: true, message: "User does not exists!"};
    }


    const generated_password = generatePassword(12, 2, 2, 1, 1);
    console.log('generisan password', generated_password)
    const hashed_password = await bcrypt.hash(generated_password, 12)
    const generatedQRCode = await generateOtpQRCode(retrievedUser.key, userEmail.email);

    try {
        const newPassword = {
            password: hashed_password
        };

        const insertedIds = await database("user").where('id', retrievedUser.id)
            .update(newPassword)

        let email_subject = "Password reset for the Application LGProject"
        let email_body = `<p>Your credentials for the Application Dogadjaji are:</p> <div>email: <b>${userEmail.email}</b></div> <div>password: <b>${generated_password}</b> </div><p>For one time password (OTP) download free Google or Microsoft Authentication application and  scan following QR code:</p><p><img src="${generatedQRCode}" alt="QR Code"/></p>`

        await sendMail(userEmail.email, email_subject, email_body, generatedQRCode)
            .then(r => {
                if (r.error) {
                    return {error: true, message: " Client inserted but mail is not sent!"};
                }
            });

        return {error: false, message: "Password reseted"};

    } catch (error_1) {

        return {error: true, message: error_1.message};

    }
}

export async function getUsers(): Promise<IUser[]> {
    return database('user').select().orderBy([{column: "name", order: "asc"}]).then((rows: any) => {
        return (rows);
    })
}

export async function editUser(updateUser: IUser) {
    console.log(updateUser, "updateUser")
    if (!updateUser.id) {
        return ({error: true, message: 'User does not exist'});
    }
    const retrievedUser = await database('user').where('id', updateUser.id).select('*').first()
    if (!retrievedUser) {
        return ({error: true, message: "User does not exist!"});
    }
    await database("user")
        .where("id", updateUser.id)
        .update(updateUser);

    return ({error: false, message: 'User updated!'});

}


export async function getRoles(): Promise<IRoles[]> {
    return database('roles').select().orderBy([{column: "name", order: "asc"}])
        .then((rows: IRoles[]) => {
            return (rows);
        })
}


export async function addRoles(newRole: IRoles) {
    try {
        const insertedIds = await database("roles")
            .insert(newRole);
        newRole.id = insertedIds[0];
        await addPrivileges(newRole.id);
        return ({error: false, message: newRole.id});
    } catch (error) {
        return ({error: true, message: 'Error while adding role'});
    }
}


export async function editRoles(updateRole: IRoles,) {
    try {
        await database("roles")
            .where("id", updateRole.id)
            .update(updateRole);
        return ({error: false, message: 'Role is updated'});

    } catch (error) {
        return ({error: true, message: 'Error changing role'});
    }
}


export async function addPrivileges(role_id: number) {
    const applications = await getApplication() as IApplication[];
    const privileges = await getPrivilages() as IPrivileges[];

    for (let i = 0; i < applications.length; i++) {
        const app = applications[i];
        for (let j = 0; j < privileges.length; j++) {
            const new_privilege = {
                roles_id: role_id,
                privileges_id: privileges[j].id,
                app_id: app.id,
                activity: false
            }
            await database("roles_privileges")
                .insert(new_privilege);
        }
    }
    return true;
}


async function getApplication(): Promise<IApplication[]> {
    return database('app').select().orderBy([{column: "app_name", order: "asc"}]).then((rows: IApplication) => {
        return (rows);
    })
}

async function getPrivilages(): Promise<IPrivileges[]> {
    return database('privileges').select().orderBy([{
        column: "privileges_name",
        order: "asc"
    }]).then((rows: IPrivileges) => {
        return (rows);
    })
}

export async function editPrivileges(updatePrivilege: IPrivilegesRoles) {
    try {
        console.log(updatePrivilege, "updatePrivilege")
        await database("roles_privileges")
            .where("roles_id", '=', updatePrivilege.roles_id)
            .andWhere("privileges_id", '=', updatePrivilege.privileges_id)
            .andWhere("app_id", '=', updatePrivilege.app_id)
            .update(updatePrivilege);

        return ({error: false, message: 'Privilege is updated'});

    } catch (error) {
        return ({error: true, message: 'Error changing privileges'});
    }

}

export async function getPrivilagesRoles(roles_id: number): Promise<IPrivilages[]> {
    return database.from('roles as u')
        .join('roles_privileges as up', 'u.id', '=', 'up.roles_id')
        .join('privileges as p', 'up.privileges_id', '=', 'p.id')
        .join('app as a', 'up.app_id', '=', 'a.id')
        .where('u.id', '=', roles_id)
        .select('u.name', 'p.privileges_name', 'a.app_name', 'a.app_route', 'u.id as roles_id', 'p.id as privileges_id', 'a.id as app_id', 'up.activity')
        .orderBy(['a.app_name', 'p.privileges_name'])
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
            for (const key in grouped) {
                result.push({key, route: grouped[key].route, value: grouped[key].value});
            }

            return (result);
        })
}
