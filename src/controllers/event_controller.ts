import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {addEvent, calendar,  eventDetails} from "../services/event_services";

const eventrouter = express.Router()


eventrouter.post("/events/add", authenticate, async (request, response) => {
    const podaciDogadjaja = request.body;
    podaciDogadjaja.user.id = request.user.id;
    console.log(podaciDogadjaja.user.user_id, "user_id", request.user.id, "request.user.id")
    await addEvent(podaciDogadjaja).then(rezultat => {
        response.json(rezultat)
    });
    console.log(podaciDogadjaja);
});



eventrouter.get("/events/calendar/:month/:year/:status", authenticate, async (request, response) => {
    const { month, year, status  } = request.params;
    const calMonth = parseInt(month.toString());
    let calYear = parseInt(year.toString());
    let calStatus = parseInt(status.toString());
    await calendar(calYear, calMonth, calStatus).then(rezultat => {
        response.json(rezultat)
    })
});

eventrouter.get("/events/list/:event_id/:fromDate/:toDate", authenticate, async (_request, response) => {
    const { event_id, fromDate,toDate } = _request.params;
    const eventId = parseInt(event_id.toString());
    await eventDetails(eventId,fromDate,toDate).then(rezultat => {
        console.log('rezultat fetch event list', rezultat)
        response.json(rezultat)
    });
});


export default eventrouter;
