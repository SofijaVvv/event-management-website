import express = require('express');
import { authenticate } from '../controllers/AuthController';
import { addRaspored, editRaspored } from '../controllers/RasporedController';

const rasporedrouter = express.Router();

rasporedrouter.post('/raspored/add', authenticate, async (request, response) => {
    const podaciRasporeda = request.body;
    await addRaspored(podaciRasporeda, response);
    console.log(podaciRasporeda);
});

rasporedrouter.post('/raspored/edit', authenticate, async (request, response) => {
    const podaciRasporeda = request.body;
    await editRaspored(podaciRasporeda, response);
    console.log(podaciRasporeda);
});

export default rasporedrouter;