import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {addAssignment, getAssignments, getPriorities} from "../services/assignment_services";

const assignmentrouter = express.Router()


assignmentrouter.get("/assignments/priorities", authenticate, async (request, response) => {
    await getPriorities().then(rezultat => {
        response.json(rezultat)
    });
});

assignmentrouter.get("/assignments/list/:event_id/:fromDate/:toDate", authenticate, async (request, response) => {
    const {event_id , fromDate, toDate} = request.params;
    const eventId = parseInt(event_id.toString());
    await getAssignments(eventId, fromDate, toDate).then(rezultat => {
        response.json(rezultat)
    });
});

assignmentrouter.post("/assignments/add", authenticate, async (request, response) => {
    const assignmentData = request.body;
    assignmentData.user.id = request.user.id;
    await addAssignment(assignmentData).then(rezultat => {
        response.json(rezultat)
    });
    console.log(assignmentData);

});


export default assignmentrouter;
