import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {addAssignment, getAssignments, getPriorities} from "../services/assignment_services";

const assignmentrouter = express.Router()


assignmentrouter.get("/assignments/priorities", authenticate, async (request, response) => {
    await getPriorities().then(rezultat => {
        response.json(rezultat)
    });
});

assignmentrouter.get("/assignments/list/:event_id", authenticate, async (request, response) => {
    const eventId: number = parseInt(request.params.event_id);
    console.log("REQUEST USER", request.user)
    await getAssignments(eventId).then(rezultat => {
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
//
// assignmentrouter.post("/assignments/edit", authenticate, async (request, response) => {
//     const podaciKomitenta = request.body;
//     await editAssignments(podaciKomitenta, response);
//     console.log(podaciKomitenta);
//
//
// });


export default assignmentrouter;
