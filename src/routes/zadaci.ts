import express = require("express");
import {authenticate} from "../controllers/AuthController";
import {addZadatak, editZadatak, getZadaci} from "../controllers/ZadaciController";

const zadacirouter = express.Router()


zadacirouter.get("/zadaci/:dogadjaj_id", authenticate, (request, response) => {

    // pozvati funkciju
    const dogadjaj_id: number = parseInt(request.params.dogadjaj_id);

    getZadaci(dogadjaj_id,rezultat => {
        response.json(rezultat)

    });

});

zadacirouter.post("/zadaci/add", authenticate, async (request, response) => {
    const podaciKomitenta = request.body;
    await addZadatak(podaciKomitenta, response);
    console.log(podaciKomitenta);

});

zadacirouter.post("/zadaci/edit", authenticate, async (request, response) => {
    const podaciKomitenta = request.body;
    await editZadatak(podaciKomitenta, response);
    console.log(podaciKomitenta);


});


export default zadacirouter;