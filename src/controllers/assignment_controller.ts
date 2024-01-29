import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {addAssignments, editAssignments, getAssignments} from "../services/assignment_services";

const assignmentrouter = express.Router()


assignmentrouter.get("/assignments/:dogadjaj_id", authenticate, (request, response) => {

    // pozvati funkciju
    const dogadjaj_id: number = parseInt(request.params.dogadjaj_id);

    getAssignments(dogadjaj_id,rezultat => {
        response.json(rezultat)

    });

});

assignmentrouter.post("/assignments/add", authenticate, async (request, response) => {
    const podaciKomitenta = request.body;
    await addAssignments(podaciKomitenta, response);
    console.log(podaciKomitenta);

});

assignmentrouter.post("/assignments/edit", authenticate, async (request, response) => {
    const podaciKomitenta = request.body;
    await editAssignments(podaciKomitenta, response);
    console.log(podaciKomitenta);


});


export default assignmentrouter;