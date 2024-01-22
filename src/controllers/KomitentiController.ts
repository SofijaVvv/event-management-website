
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore

import database from "../../config/db.js";
import {IKomitent} from "../../Interface.js";



export function getKomitenti(callback) {
    database('komitent').select().orderBy([{ column : "naziv",order: "asc"}]).then((rows) => {
        callback(rows);
    })
}




export async function addKomitent(noviKomitent:IKomitent, response) {
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

export async function editKomitent(updatePodaciKomitenta:IKomitent, response) {
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


