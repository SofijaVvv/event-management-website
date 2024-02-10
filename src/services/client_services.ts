
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore

import database from "../repository /db.js";
import {IClient} from "../interfaces/client.js";



export function getClient(callback) {
    database('client').select().orderBy([{ column : "name",order: "asc"}]).then((rows) => {
        callback(rows);
    })
}




export async function addClient(noviKomitent:IClient, response) {
    try {
        const insertedIds = await database("komitent")
            .insert(noviKomitent);
        noviKomitent.id= insertedIds[0];
        response.json(noviKomitent);
    } catch (error) {
        console.error('Greška prilikom dodavanja komitenta:', error);
        response.status(500).json({ success: false, message: 'Greška prilikom dodavanja komitenta.' });
    }
}

export async function editClient(updatePodaciKomitenta:IClient, response) {
    try {
        const komitent = await database("komitent")
            .where("id", updatePodaciKomitenta.id)
            .update(updatePodaciKomitenta);
        response.status(200).json({ success: true, message: 'Komitent je izmijenjen.' });
    } catch (error) {
        console.error('Greška prilikom izmene komitenta:', error);
        response.status(500).json({ success: false, message: 'Greška prilikom izmene komitenta.' });
    }


}


