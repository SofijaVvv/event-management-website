import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {addCost, getCosts} from "../services/costs_services";

const costsrouter = express.Router()


costsrouter.get("/cost/list/:event_id", authenticate, async (request, response) => {
    const eventId: number = parseInt(request.params.event_id);
    await getCosts(eventId).then(rezultat => {
        response.json(rezultat)
    });
});

costsrouter.post("/cost/add", authenticate, async (request, response) => {
    const costData = request.body;
    costData.user.id = request.user.id;
    await addCost(costData).then(rezultat => {
        response.json(rezultat)
    });
    console.log(costData);

});





export default costsrouter;
