import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import { addClient, getClient} from "../services/client_services";
import {exportClientExcel} from "../services/excel_services";
import {clientsToExcel} from "../services/shared_services";


const clientrouter = express.Router()

clientrouter.get("/client/:id", authenticate,  async (_request, response) => {
    const { id } = _request.params;
    const eventId = parseInt(id.toString());
    await getClient(eventId).then(rezultat => {
        response.json(rezultat)
    });
});

clientrouter.post("/client/add", authenticate, async (request, response) => {
    const clientData = request.body;
    await addClient(clientData).then(rezultat => {
        response.json(rezultat)
    });

});

clientrouter.get("/client/excel/:event_id/:fromDate/:toDate/:language", authenticate, async (request, response) => {
    const {event_id , fromDate, toDate, language} = request.params;
    const eventId = parseInt(event_id.toString());
    await clientsToExcel(eventId).then(rezultat => {
        response.send(rezultat)
    });
});

export default clientrouter;