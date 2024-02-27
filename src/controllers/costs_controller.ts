import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {addOtherCost, getCosts} from "../services/costs_services";

const costsrouter = express.Router()

costsrouter.get("/cost/other/:fromDate/:toDate", authenticate, async (request, response) => {
    const { fromDate,toDate } = request.params;
    await getCosts(fromDate, toDate).then(rezultat => {
        response.json(rezultat)
    })
});


costsrouter.post("/cost/other/add", authenticate, async (request, response) => {
    const costData = request.body;
    costData.user.id = request.user.id;
    await addOtherCost(costData).then(rezultat => {
        response.json(rezultat)
    });
    console.log(costData);

});
export default costsrouter;