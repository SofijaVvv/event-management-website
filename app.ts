import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import adminRouter from './src/controllers/admin_controller.js';
import komitentiRouter from './src/controllers/client_controller.js';
import dogadjajiRouter from './src/controllers/event_controller.js';
import zadaciRouter from './src/controllers/assignment_controller.js';
import rasporedRouter from './src/controllers/schedule_controller.js';
import troskoviRouter from './src/controllers/costs_controller.js';
import prihodiRouter from './src/controllers/revenue_controller.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(adminRouter);
app.use(komitentiRouter);
app.use(dogadjajiRouter);
app.use(zadaciRouter);
app.use(rasporedRouter);
app.use(troskoviRouter);
app.use(prihodiRouter);


export default app;



