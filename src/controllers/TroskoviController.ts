import database from "../../config/db.js";
import {ITroskovi} from "../../Interface.js";

export async function addTrosak(noviTrosak:ITroskovi, response) {
    try {
        const insertedIds = await database("dogadjaj_troskovi")
            .insert(noviTrosak);

        noviTrosak.id= insertedIds[0];
        response.json(noviTrosak);

    } catch (error) {
        console.error('Greška prilikom dodavanja troška:', error);
        response.status(500).json({ success: false, message: 'Greška prilikom dodavanja troška.' });
    }
}


export async function editTrosak(updatePodaciTroska:ITroskovi, response) {
    try {
        const dogadjaj = await database("dogadjaj_troskovi")
            .where("id", updatePodaciTroska.id)
            .update(updatePodaciTroska);

        response.status(200).json({success: true, message: 'Trošak je izmijenjen.'});
    }
    catch (error) {
        console.error('Greška prilikom izmene troška:', error);
        response.status(500).json({success: false, message: 'Greška prilikom izmene troška.'});
    }

}

