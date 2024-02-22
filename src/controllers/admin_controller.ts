import express = require("express");
import {authenticate,} from "../middleware/auth_middleware";

import {logIn} from "../services/login_services";
import {IUser} from "../interfaces/user.js";
import {IRoles} from "../interfaces/roles.js";

import {
    addPrivileges,
    addRoles,
    createUser, editPrivileges,
    editRoles,
    editUser,
    getPrivilagesRoles,
    getRoles,
    getUsers, resetPassword
} from "../services/admin_services";
import {IPrivileges} from "../interfaces/privileges";
import {IPrivilegesRoles} from "../interfaces/privilages_roles";


const adminrouter = express.Router()

adminrouter.get("/admin/user/list", authenticate, async (_request, response) => {
    console.log(_request.url, _request.baseUrl)
    await getUsers().then(rezultat => {
        response.json(rezultat)
    })

});

adminrouter.post("/admin/user/create", authenticate, async (request, response) => {
    const podaciOperatera: IUser = request.body;
    await createUser(podaciOperatera).then(result => {
        console.log(result,"new_user_result")
        response.json(result)
    })
});

adminrouter.post("/admin/user/reset", authenticate, async (request, response) => {
    const userEmail = request.body;
    await resetPassword(userEmail).then(result => {
        console.log(result,"reset_password_result")
        response.json(result)

    })
});


adminrouter.post("/login", async (request, response) => {

    const podaciOperatera: IUser = request.body;
    await logIn(podaciOperatera).then(result => {
        console.log(result,"login_result")
        response.json(result)
    });

});


adminrouter.post("/admin/user/edit", authenticate, async (request, response) => {
    const podaciOperatera: IUser = request.body;
    await editUser(podaciOperatera).then(result => {
        console.log(result,"edit_user_result")
        response.json(result)
    });
});


///////////////////////ULOGE////////////////////////

adminrouter.post("/admin/roles/add", authenticate, async (request, response) => {
    const podaciUloge:IRoles = request.body;
    await addRoles(podaciUloge).then(result => {
        console.log(result,"new_role_result")
        response.json(result)
    });
});

adminrouter.get("/admin/roles", authenticate, async (_request, response) => {
    await getRoles().then(rezultat => {
        response.json(rezultat)
    })
});

adminrouter.get("/admin/roles_privileges/:roles_id", authenticate, async (request, response) => {
    const uloge_id: number = parseInt(request.params.roles_id);
    await getPrivilagesRoles(uloge_id).then(rezultat => {
        response.json(rezultat)
    })
});

adminrouter.post("/admin/roles/edit", authenticate, async (request, response) => {
    const roleInfo:IRoles = request.body;
    await editRoles(roleInfo).then(result => {
        console.log(result,"edit_role_result")
        response.json(result)
    });

});

// /////////////////////PRIVILEGIJE////////////////////////

adminrouter.post("/admin/privileges/edit", authenticate, async (request, response) => {
    const privilegeInfo: IPrivilegesRoles = request.body;
    await editPrivileges(privilegeInfo).then(result => {
        console.log(result,"edit_privileges_result")
        response.json(result)
    });
});



// adminrouter.post("/privilegije/assign", authenticate, async (request, response) => {
//     const privilegije: IPrivilages = request.body;
//     await addPrivileges();
//     console.log(privilegije);
//
// });





export default adminrouter;