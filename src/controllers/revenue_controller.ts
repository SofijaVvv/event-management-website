import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {addRevenue, getRevenues} from "../services/revenue_services";

const revenuerouter = express.Router()


revenuerouter.get("/revenue/list/:event_id", authenticate, async (request, response) => {
    const eventId: number = parseInt(request.params.event_id);
    await getRevenues(eventId).then(rezultat => {
        response.json(rezultat)
    });
});

revenuerouter.post("/revenue/add", authenticate, async (request, response) => {
    const revenueData = request.body;
    revenueData.user.id = request.user.id;
    await addRevenue(revenueData).then(rezultat => {
        response.json(rezultat)
    });
    console.log(revenueData);

});

export default revenuerouter;
