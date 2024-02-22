import express = require("express");
import {authenticate,} from "../middleware/auth_middleware";
import {
    getClients, getCostsType,
    getEventStatuses,
    getEventTypes,
    getLocations, getRevenuesTypes,
    getSharedUsers, getTypeOfClients, getUnits
} from "../controllers/shared_controller";
import {getRevenues} from "./revenue_services";


const sharedrouter   = express.Router()

sharedrouter.get("/shared/users", authenticate, async (_request, response) => {
    console.log(_request.url, _request.baseUrl)
    await getSharedUsers().then(rezultat => {
        response.json(rezultat)
    })
});


sharedrouter.get("/shared/locations", authenticate, async (_request, response) => {
    console.log(_request.url, _request.baseUrl)
    await getLocations().then(rezultat => {
        response.json(rezultat)
    })
});


sharedrouter.get("/shared/event_types", authenticate, async (_request, response) => {
    console.log(_request.url, _request.baseUrl)
    await getEventTypes().then(rezultat => {
        response.json(rezultat)
    })
});

sharedrouter.get("/shared/event_statuses", authenticate, async (_request, response) => {
    console.log(_request.url, _request.baseUrl)
    await getEventStatuses().then(rezultat => {
        response.json(rezultat)
    })
});

sharedrouter.get("/shared/clients", authenticate, async (_request, response) => {
    console.log(_request.url, _request.baseUrl)
    await getClients().then(rezultat => {
        response.json(rezultat)
    })
});

sharedrouter.get("/shared/type_of_client", authenticate, async (_request, response) => {
    console.log(_request.url, _request.baseUrl)
    await getTypeOfClients().then(rezultat => {
        response.json(rezultat)
    })
});


sharedrouter.get("/shared/revenue_types", authenticate, async (_request, response) => {
    console.log(_request.url, _request.baseUrl)
    await getRevenuesTypes().then(rezultat => {
        response.json(rezultat)
    })
});

sharedrouter.get("/shared/units", authenticate, async (_request, response) => {
    console.log(_request.url, _request.baseUrl)
    await getUnits().then(rezultat => {
        response.json(rezultat)
    })
});


sharedrouter.get("/shared/costs_types", authenticate, async (_request, response) => {
    console.log(_request.url, _request.baseUrl)
    await getCostsType().then(rezultat => {
        response.json(rezultat)
    })
});




export default sharedrouter;
