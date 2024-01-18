import express = require("express");
import {authenticate} from "../controllers/AuthController";

import { editKomitent, getKomitenti} from "../controllers/KomitentiController";
const komitentirouter = express.Router()
import {addKomitent} from "../controllers/KomitentiController";
import komitenti from "./komitenti";

komitentirouter.get("/komitenti", authenticate, (request, response) => {

  // pozvati funkciju
    getKomitenti(rezultat => {
        response.json(rezultat)

    });

});

komitentirouter.post("/komitenti/add", authenticate, async (request, response) => {
    const podaciKomitenta = request.body;
    await addKomitent(podaciKomitenta, response);
    console.log(podaciKomitenta);

});

komitentirouter.post("/komitenti/edit", authenticate, async (request, response) => {
    const podaciKomitenta = request.body;
    await editKomitent(podaciKomitenta, response);
    console.log(podaciKomitenta);


});

// komitentirouter.post("/komitenti/add", addKmitent);
export default komitentirouter;