import express = require("express");
import {authenticate} from "../middleware/auth_middleware";

import { editClient, getClient} from "../services/client_services";
const clientrouter = express.Router()
import {addClient} from "../services/client_services";
import {IClient} from "../interfaces/client";


clientrouter.get("/client", authenticate, (_request, response) => {


    getClient((rezultat:IClient) => {
        response.json(rezultat)

    });

});

clientrouter.post("/client/add", authenticate, async (request, response) => {
    const podaciKomitenta = request.body;
    await addClient(podaciKomitenta, response);
    console.log(podaciKomitenta);

});

clientrouter.post("/client/edit", authenticate, async (request, response) => {
    const podaciKomitenta = request.body;
    await editClient(podaciKomitenta, response);
    console.log(podaciKomitenta);


});

// komitentirouter.post("/komitenti/add", addKmitent);
export default clientrouter;