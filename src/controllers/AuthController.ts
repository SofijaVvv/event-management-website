import database from "../../config/db.js";
import jwt = require("jsonwebtoken");
import settings = require("../../config/settings.js");
import bcrypt = require("bcrypt");
import {IUser, IUloge, IPrivilegije, IPrivilegijeUloge, IAplikacije} from "../../Interface.js";


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
                        uloge_id: reqBody.uloge_id,
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

export async function editUser(updateUser:IUser, response){
console.log(updateUser,"updateUser")
    if (!updateUser.id) {
        response.status(200).json({ success: false, message: 'Nema usera.' });
        return
    }
    const retrievedUser = await database('operater').where('id', updateUser.id).select('*').first()
    if (!retrievedUser) {
        return response.json({error: true, message: "User does not exist!"});
    }

    const user  = await database("operater")
        .where("id", updateUser.id)
        .update(updateUser);

    response.status(200).json({ success: true, message: 'Operater je izmijenjen.' });

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

///////////////////////////////////ULOGE///////////////////////////////////////

export async function getUloge():Promise<IUloge[]>{



    return database('uloge').select().orderBy([{ column : "uloge_naziv",order: "asc"}]).then((rows) => {
       return (rows);
    })
}



export async function addUloga(novaUloga:IUloge, response){
    try{

        const insertedIds = await database("uloge")
            .insert(novaUloga);

        novaUloga.id= insertedIds[0];
        await addPrivilegije(novaUloga.id);
        response.json(novaUloga);

    } catch (error) {
        console.error('Greška prilikom dodavanja uloge:', error);
        response.status(500).json({ success: false, message: 'Greška prilikom dodavanja uloge.' });
    }

}

export async function editUloge(updateUloga:IUloge, response){
   try{
       const uloga = await database("uloge")
           .where("id", updateUloga.id)
           .update(updateUloga);

       response.status(200).json({ success: true, message: 'Uloga je izmijenjena.' });

   } catch (error) {

       console.error('Greška prilikom izmene uloge:', error);
       response.status(500).json({success: false, message: 'Greška prilikom izmene uloge.'});

   }
}

///////////////////////////////////PRIVILEGIJE///////////////////////////////////////


export async function addPrivilegije(uloga_id: number) {

                const aplikacije = await getAplikacije() as IAplikacije[];
                const privilegije = await getPrivilegije() as IPrivilegije[];

                for (let i = 0; i < aplikacije.length; i++) {
                    const app = aplikacije[i];
                    console.log(app.app_naziv, "app")
                    for (let j = 0; j < privilegije.length; j++) {
                        const tmp  = {
                            uloge_id: uloga_id,
                            privilegije_id: privilegije[j].id,
                            app_id: app.id,
                            aktivan: false
                        }
                        const insertedIds = await database("uloge_privilegije")
                            .insert(tmp);
                        console.log(tmp, "tmp")
                    }
                }
                return true;
}


async function getAplikacije(): Promise<IAplikacije[]>{
    return database('app').select().orderBy([{column: "app_naziv", order: "asc"}]).then((rows) => {
        return (rows);
    })
}

async function getPrivilegije(): Promise<IPrivilegije[]>{
    return database('privilegije').select().orderBy([{column: "privilegija_naziv", order: "asc"}]).then((rows) => {
        return (rows);
    })
}

export async function getPrivilegijeUloge(uloge_id: number): Promise<IPrivilegijeUloge[]>{
    return database.from('uloge as u')
        .join('uloge_privilegije as up', 'u.id', '=', 'up.uloge_id')
        .join('privilegije as p', 'up.privilegije_id', '=', 'p.id')
        .join('app as a', 'up.app_id', '=', 'a.id')
        .where('u.id', '=', uloge_id)
        .select('u.uloge_naziv', 'p.privilegija_naziv', 'a.app_naziv', 'u.id as uid', 'p.id as pid', 'a.id as aid', 'up.aktivan')
        .orderBy(['a.app_naziv', 'p.privilegija_naziv']).then((rows) => {
            const grouped = rows.reduce((acc, cur) => {
                if (!acc[cur.app_naziv]) {
                    acc[cur.app_naziv] = [];
                }
                acc[cur.app_naziv].push({
                    privilegija_naziv: cur.privilegija_naziv,
                    uid: cur.uid,
                    pid: cur.pid,
                    aid: cur.aid,
                    aktivan: cur.aktivan
                });

                return acc;
            }, {});
        return (grouped);
    })
}

