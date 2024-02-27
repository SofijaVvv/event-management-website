import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {getEventCosts} from "../services/event_costs_services";
import {addEventCost} from "../services/event_costs_services";


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




export default eventcostsrouter;
