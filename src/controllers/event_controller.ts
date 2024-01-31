import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {addEvent, editEvent, getEvent} from "../services/event_services";

const eventrouter = express.Router()

eventrouter.get("/events", authenticate, (_request, response) => {
    getEvent(rezultat => {
        response.json(rezultat)
    })
});

eventrouter.post("/events/add", authenticate, async (request, response) => {
    const podaciDogadjaja = request.body;
    await addEvent(podaciDogadjaja, response);
    console.log(podaciDogadjaja);
});

eventrouter.post("/events/edit", authenticate, async (request, response) => {
    const podaciDogadjaja = request.body;
    await editEvent(podaciDogadjaja, response);
    console.log(podaciDogadjaja);
});

export default eventrouter;