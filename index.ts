import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import adminRouter from './src/routes/admin.js';
import komitentiRouter from './src/routes/komitenti.js';
import dogadjajiRouter from './src/routes/dogadjaji.js';
import zadaciRouter from './src/routes/zadaci.js';
import rasporedRouter from './src/routes/raspored.js';
import troskoviRouter from './src/routes/troskovi.js';
import prihodiRouter from './src/routes/prihodi.js';


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




const port = 3000
app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.listen(port, () => console.log('listening at port '))
