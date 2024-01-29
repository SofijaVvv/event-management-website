import database from "../repository /db.js";
import {ICosts} from "../interfaces/costs.js";

export async function addCost(noviTrosak:ICosts, response) {
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


export async function editCost(updatePodaciTroska:ICosts, response) {
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

