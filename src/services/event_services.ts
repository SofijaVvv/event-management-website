import database from "../repository /db.js";
import {IEvents} from "../interfaces/events.js";


export function getEvent(callback : (rows:IEvents[]) => void)
{
    database('dogadjaji').select().orderBy([{ column : "datum",order: "desc"}]).then((rows) => {
        callback(rows);

    })

}

export async function addEvent(noviDogadjaj:IEvents, response) {
    try {
        const tmp = noviDogadjaj.datum.split(".");
        noviDogadjaj.datum = tmp[2]+"-"+tmp[1]+"-"+tmp[0];

        const insertedIds = await database("dogadjaji")
            .insert(noviDogadjaj);

        noviDogadjaj.id= insertedIds[0];
        response.json(noviDogadjaj);

    } catch (error) {
        console.error('Greška prilikom dodavanja dogadjaja:', error);
        response.status(500).json({ success: false, message: 'Greška prilikom dodavanja dogadjaja.' });
    }
}

export async function editEvent(updatePodaciDogadjaja:IEvents, response) {
    try {
        const tmp = updatePodaciDogadjaja.datum.split(".");
        updatePodaciDogadjaja.datum = tmp[2]+"-"+tmp[1]+"-"+tmp[0];

        const dogadjaj = await database("dogadjaji")
            .where("id", updatePodaciDogadjaja.id)
            .update(updatePodaciDogadjaja);

        response.status(200).json({ success: true, message: 'Dogadjaj je izmijenjen.' });


    } catch (error) {
        console.error('Greška prilikom izmene dogadjaja:', error);
        response.status(500).json({success: false, message: 'Greška prilikom izmene dogadjaja.'});
    }
}