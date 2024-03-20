import express = require('express');
import { authenticate } from '../middleware/auth_middleware';
import {addSchedule, getScheduleList, getSchedules} from '../services/schedule_services';
import {scheduleToExcel} from "../services/shared_services";
import {getAssignmentList} from "../services/assignment_services";


const schedulerouter = express.Router();

schedulerouter.get("/schedule/list/:event_id/:fromDate/:toDate", authenticate, async (request, response) => {
    const {event_id , fromDate, toDate} = request.params;
    const eventId = parseInt(event_id.toString());
    await getSchedules(eventId, fromDate, toDate).then(rezultat => {
        response.json(rezultat)
    });
});

schedulerouter.get("/schedule/list_events/:event_id/:fromDate/:toDate", authenticate, async (request, response) => {
    const {event_id , fromDate, toDate} = request.params;
    const eventId = parseInt(event_id.toString());
    await getScheduleList(eventId, fromDate, toDate).then(rezultat => {
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
