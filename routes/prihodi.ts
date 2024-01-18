import express = require("express");
import {authenticate} from "../controllers/AuthController";
import {addPrihod, editPrihod} from "../controllers/PrihodiController";

const prihodirouter = express.Router()

prihodirouter.post("/prihodi/add", authenticate, async (req, res) => {
    const podaciPrihoda = req.body;
    await addPrihod(podaciPrihoda, res);
    console.log(podaciPrihoda);

});

prihodirouter.post("/prihodi/edit", authenticate, async (req, res) => {
    const podaciPrihoda = req.body;
    await editPrihod(podaciPrihoda, res);
    console.log(podaciPrihoda);

});

export default prihodirouter;