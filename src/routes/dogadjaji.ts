import express = require("express");
import {authenticate} from "../controllers/AuthController";
import {addDogadjaj, editDogadjaj, getDogadjaji} from "../controllers/DogadjajiController";

const dogadjajirouter = express.Router()

dogadjajirouter.get("/dogadjaji", authenticate, (request, response) => {
    getDogadjaji(rezultat => {
        response.json(rezultat)
    })
});

dogadjajirouter.post("/dogadjaji/add", authenticate, async (request, response) => {
    const podaciDogadjaja = request.body;
    await addDogadjaj(podaciDogadjaja, response);
    console.log(podaciDogadjaja);
});

dogadjajirouter.post("/dogadjaji/edit", authenticate, async (request, response) => {
    const podaciDogadjaja = request.body;
    await editDogadjaj(podaciDogadjaja, response);
    console.log(podaciDogadjaja);
});

export default dogadjajirouter;