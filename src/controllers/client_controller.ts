import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import { addClient, getClient} from "../services/client_services";


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


export default clientrouter;