import database from "../../config/db.js";
import {IPrihodi} from "../../Interface.js";

export async function addPrihod(noviPrihod:IPrihodi, response) {
    try {
        const tmp = noviPrihod.rok_placanja.split(".");
        noviPrihod.rok_placanja = tmp[2]+"-"+tmp[1]+"-"+tmp[0];

        const insertedIds = await database("prihodi")
            .insert(noviPrihod);

        noviPrihod.id= insertedIds[0];
        response.json(noviPrihod);

    } catch (error) {
        console.error('Greška prilikom dodavanja prihoda:', error);
        response.status(500).json({ success: false, message: 'Greška prilikom dodavanja prihoda.' });
    }
}

export async function editPrihod(updatePodaciPrihoda:IPrihodi, response) {
    try {
        const tmp = updatePodaciPrihoda.rok_placanja.split(".");
        updatePodaciPrihoda.rok_placanja = tmp[2] + "-" + tmp[1] + "-" + tmp[0];

        const dogadjaj = await database("prihodi")
            .where("id", updatePodaciPrihoda.id)
            .update(updatePodaciPrihoda);

        response.status(200).json({success: true, message: 'Prihod je izmijenjen.'});

    } catch (error) {
        console.error('Greška prilikom dodavanja prihoda:', error);
        response.status(500).json({success: false, message: 'Greška prilikom dodavanja prihoda.'});
    }
}


