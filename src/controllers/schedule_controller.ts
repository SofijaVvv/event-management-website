import express = require('express');
import { authenticate } from '../middleware/auth_middleware';
import {addSchedule, getSchedules} from '../services/schedule_services';
import {addAssignment} from "../services/assignment_services";
import {exportScheduleExcel} from "../services/excel_services";
import {scheduleToExcel} from "../services/shared_services";

const schedulerouter = express.Router();




schedulerouter.get("/schedule/list/:event_id/:fromDate/:toDate", authenticate, async (request, response) => {
    const {event_id , fromDate, toDate} = request.params;
    const eventId = parseInt(event_id.toString());
    await getSchedules(eventId, fromDate, toDate).then(rezultat => {
        response.json(rezultat)
    });
});


schedulerouter.post("/schedule/add", authenticate, async (request, response) => {
    const scheduleData = request.body;
    scheduleData.user.id = request.user.id;
    await addSchedule(scheduleData).then(rezultat => {
        response.json(rezultat)
    });
    console.log(scheduleData);

});

schedulerouter.get("/schedule/excel/:event_id/:fromDate/:toDate/:language", authenticate, async (request, response) => {
    const {event_id , fromDate, toDate, language} = request.params;
    const eventId = parseInt(event_id.toString());
    await scheduleToExcel(eventId, fromDate, toDate, language).then(rezultat => {
        response.send(rezultat)
    });
});


export default schedulerouter;
