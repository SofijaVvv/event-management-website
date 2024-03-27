import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {addAssignment, getAssignmentList, getAssignments, getPriorities} from "../services/assignment_services";
import {assignmentsToExcel} from "../services/shared_services";


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


assignmentrouter.get("/assignments/list_events/:event_id/:fromDate/:toDate", authenticate, async (request, response) => {
    const {event_id , fromDate, toDate} = request.params;
    const eventId = parseInt(event_id.toString());
    await getAssignmentList(eventId, fromDate, toDate).then(rezultat => {
        response.json(rezultat)
    });
});

assignmentrouter.post("/assignments/add", authenticate, async (request, response) => {
    const assignmentData = request.body;
    // assignmentData.user.id = request.user.id;
    await addAssignment(assignmentData).then(rezultat => {
        response.json(rezultat)
    });
});

assignmentrouter.get("/assignments/excel/:event_id/:fromDate/:toDate/:language", authenticate, async (request, response) => {
    const {event_id , fromDate, toDate, language} = request.params;
    const eventId = parseInt(event_id.toString());
    await assignmentsToExcel(eventId, fromDate, toDate, language).then(rezultat => {
        response.send(rezultat)
    });
});



export default assignmentrouter;
