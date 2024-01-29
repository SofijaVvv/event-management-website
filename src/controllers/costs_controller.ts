import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {addCost, editCost} from "../services/costs_services";

const costsrouter = express.Router()

costsrouter.post("/costs/add", authenticate, async (req, res) => {
    const podaciTroska = req.body;
    await addCost(podaciTroska, res);
    console.log(podaciTroska);
});

costsrouter.post("/costs/edit", authenticate, async (req, res) => {
    const podaciTroska = req.body;
    await editCost(podaciTroska, res);
    console.log(podaciTroska);
});



export default costsrouter;