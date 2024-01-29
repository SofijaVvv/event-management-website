import database from "../repository /db.js";
import {IAssignments} from "../interfaces/assignments.js";


export function getAssignments( dogadjaj_id: number ,callback : (rows:IAssignments[]) => void)
{

    database('dogadjaji_zadaci').select().where({dogadjaj_id: dogadjaj_id})
        .orderBy([{ column : "status",order: "desc"}])
        .then((rows) => {
        callback(rows);

    })

}

export async function addAssignments(noviZadatak:IAssignments, response) {
    try {
        const tmp = noviZadatak.datum_kreiranja.split(".");
        noviZadatak.datum_kreiranja = tmp[2]+"-"+tmp[1]+"-"+tmp[0];

        const insertedIds = await database("dogadjaji_zadaci")
            .insert(noviZadatak);

        noviZadatak.id= insertedIds[0];
        response.json(noviZadatak);

    } catch (error) {
        console.error('Greška prilikom dodavanja dogadjaja:', error);
        response.status(500).json({ success: false, message: 'Greška prilikom dodavanja dogadjaja.' });
    }
}

export async function editAssignments(updatePodaciZadatka:IAssignments, response) {
    try {
        const tmp = updatePodaciZadatka.datum_kreiranja.split(".");
        updatePodaciZadatka.datum_kreiranja = tmp[2]+"-"+tmp[1]+"-"+tmp[0];

        const dogadjaj = await database("dogadjaji_zadaci")
            .where("id", updatePodaciZadatka.id)
            .update(updatePodaciZadatka);

        response.status(200).json({ success: true, message: 'Dogadjaj je izmijenjen.' });


    } catch (error) {
        console.error('Greška prilikom izmene dogadjaja:', error);
        response.status(500).json({success: false, message: 'Greška prilikom izmene dogadjaja.'});
    }
}