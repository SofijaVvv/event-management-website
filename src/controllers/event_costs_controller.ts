import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {getEventCosts} from "../services/event_costs_services";
import {addEventCost} from "../services/event_costs_services";
import {costToExcel} from "../services/shared_services";


const eventcostsrouter = express.Router()


eventcostsrouter.get("/cost/events/:event_id/:fromDate/:toDate", authenticate, async (request, response) => {
    const { event_id, fromDate,toDate } = request.params;
    const eventId = parseInt(event_id.toString());
    await getEventCosts(eventId, fromDate, toDate).then(rezultat => {
        response.json(rezultat)
    });
});


eventcostsrouter.post("/cost/events/add", authenticate, async (request, response) => {
    const costData = request.body;
    costData.user.id = request.user.id;
    await addEventCost(costData).then(rezultat => {
        response.json(rezultat)
    });
    console.log(costData);
})

eventcostsrouter.get("/cost/excel/:event_id/:fromDate/:toDate/:language", authenticate, async (request, response) => {
    const {event_id , fromDate, toDate, language} = request.params;
    const eventId = parseInt(event_id.toString());
    await costToExcel(eventId, fromDate, toDate, language).then(rezultat => {
        response.send(rezultat)
    });
});


export default eventcostsrouter;
