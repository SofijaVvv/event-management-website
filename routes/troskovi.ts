import express = require("express");
import {authenticate} from "../controllers/AuthController";
import {addTrosak, editTrosak} from "../controllers/TroskoviController";

const troskovirouter = express.Router()

troskovirouter.post("/trosak/add", authenticate, async (req, res) => {
    const podaciTroska = req.body;
    await addTrosak(podaciTroska, res);
    console.log(podaciTroska);
});

troskovirouter.post("/trosak/edit", authenticate, async (req, res) => {
    const podaciTroska = req.body;
    await editTrosak(podaciTroska, res);
    console.log(podaciTroska);
});



export default troskovirouter;