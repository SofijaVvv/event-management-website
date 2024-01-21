import database from "../../config/db.js";
import {IDogadjaj, IRaspored} from "../../Interface.js";

export async function addRaspored(noviRaspored:IRaspored, response){
    try {
        const tmp = noviRaspored.vrijeme_pocetka.split(".");
        noviRaspored.vrijeme_pocetka = tmp[2]+"-"+tmp[1]+"-"+tmp[0];

        const insertedIds = await database("dogadjaji_raspored")
            .insert(noviRaspored);

        noviRaspored.id= insertedIds[0];
        response.json(noviRaspored);

    } catch (error) {
        console.error('Greška prilikom dodavanja rasporeda:', error);
        response.status(500).json({ success: false, message: 'Greška prilikom dodavanja rasporeda.' });
    }

}

export async function editRaspored(updatePodaciRaspored:IRaspored, response) {
    try {
        const tmp = updatePodaciRaspored.vrijeme_pocetka.split(".");
        updatePodaciRaspored.vrijeme_pocetka = tmp[2]+"-"+tmp[1]+"-"+tmp[0];

        const raspored = await database("dogadjaji_raspored")
            .where("id", updatePodaciRaspored.id)
            .update(updatePodaciRaspored);

        response.status(200).json({ success: true, message: 'Raspored je izmijenjen.' });


    } catch (error) {
        console.error('Greška prilikom izmene rasporeda:', error);
        response.status(500).json({success: false, message: 'Greška prilikom izmene rasporeda.'});
    }


}