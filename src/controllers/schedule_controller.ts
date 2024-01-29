import express = require('express');
import { authenticate } from '../middleware/auth_middleware';
import {addSchedule,editSchedule} from '../services/schedule_services';

const schedulerouter = express.Router();

schedulerouter.post('/schedule/add', authenticate, async (request, response) => {
    const podaciRasporeda = request.body;
    await addSchedule(podaciRasporeda, response);
    console.log(podaciRasporeda);
});

schedulerouter.post('/schedule/edit', authenticate, async (request, response) => {
    const podaciRasporeda = request.body;
    await editSchedule(podaciRasporeda, response);
    console.log(podaciRasporeda);
});

export default schedulerouter;