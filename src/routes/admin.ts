import express = require("express");
import {
    authenticate,
    createUser,
    editUser,
    logIn,
    addUloga,
    getUloge,
    editUloge,
    addPrivilegije, getPrivilegijeUloge
} from "../controllers/AuthController";
import {IPrivilegije, IUloge, IUser} from "../../Interface";


const adminrouter = express.Router()

adminrouter.post("/user/create", authenticate, async (request, response) => {
    const podaciOperatera: IUser = request.body;
    await createUser(podaciOperatera, response);
    console.log(podaciOperatera);


});
adminrouter.post("/login", authenticate, async (request, response) => {
    const podaciOperatera: IUser = request.body;
    await logIn(podaciOperatera, response);
    console.log(podaciOperatera);
});


adminrouter.post("/user/edit", authenticate, async (request, response) => {
    const podaciOperatera: IUser = request.body;
    await editUser(podaciOperatera, response);
    console.log(podaciOperatera);

});


///////////////////////ULOGE////////////////////////

adminrouter.post("/uloge/add", authenticate, async (request, response) => {
    const podaciUloge: IUloge = request.body;
    await addUloga(podaciUloge, response);
    console.log(podaciUloge);
});

adminrouter.get("/uloge", authenticate, async (request, response) => {
    await getUloge().then(rezultat => {
        response.json(rezultat)
    })
});

adminrouter.get("/uloge_privilegije/:uloge_id", authenticate, async (request, response) => {
    const uloge_id: number = parseInt(request.params.uloge_id);
    await getPrivilegijeUloge(uloge_id).then(rezultat => {
        response.json(rezultat)
    })
});

adminrouter.post("/uloge/edit", authenticate, async (request, response) => {
    const podaciUloge: IUloge = request.body;
    await editUloge(podaciUloge, response);
    console.log(podaciUloge);
});

///////////////////////PRIVILEGIJE////////////////////////
// adminrouter.post("/privilegije/assign", authenticate, async (request, response) => {
//     const privilegije: IPrivilegije = request.body;
//     await addPrivilegije(privilegije, response);
//     console.log(privilegije);
//
// });

export default adminrouter;