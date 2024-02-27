import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import adminRouter from './src/controllers/admin_controller.js';
import komitentiRouter from './src/controllers/client_controller.js';
import dogadjajiRouter from './src/controllers/event_controller.js';
import zadaciRouter from './src/controllers/assignment_controller.js';
import rasporedRouter from './src/controllers/schedule_controller.js';
import troskoviRouter from './src/controllers/event_costs_controller';
import prihodiRouter from './src/controllers/revenue_controller.js';
import sharedrouter from "./src/services/shared_services";
import analisysrouter from "./src/controllers/analisys_controller";
import costsrouter from "./src/controllers/costs_controller";

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
app.use(sharedrouter)
app.use(analisysrouter)
app.use(costsrouter)

export default app;



