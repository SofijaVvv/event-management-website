import express = require("express");
import {authenticate,} from "../middleware/auth_middleware";
import {IUser} from "../interfaces/user.js";
import {IRoles} from "../interfaces/roles.js";
import {addRoles, createUser, editPrivileges, editRoles, editUser, getPrivilagesRoles, getRoles, getUsers, resetPassword} from "../services/admin_services";
import {IPrivilegesRoles} from "../interfaces/privilages_roles";


const adminrouter = express.Router()

adminrouter.get("/admin/user/list", authenticate, async (_request, response) => {
    await getUsers().then(rezultat => {
        response.json(rezultat)
    })

});

adminrouter.post("/admin/user/create", authenticate, async (request, response) => {
    const podaciOperatera: IUser = request.body;
    await createUser(podaciOperatera).then(result => {
        response.json(result)
    })
});

adminrouter.post("/admin/user/reset", authenticate, async (request, response) => {
    const userEmail = request.body;
    await resetPassword(userEmail).then(result => {
        response.json(result)

    })
});

adminrouter.post("/admin/user/edit", authenticate, async (request, response) => {
    const podaciOperatera: IUser = request.body;
    await editUser(podaciOperatera).then(result => {
        response.json(result)
    });
});

adminrouter.post("/admin/roles/add", authenticate, async (request, response) => {
    const podaciUloge: IRoles = request.body;
    await addRoles(podaciUloge).then(result => {
        response.json(result)
    });
});

adminrouter.get("/admin/roles", authenticate, async (_request, response) => {
    await getRoles().then(rezultat => {
        response.json(rezultat)
    })
});

adminrouter.post("/admin/roles/edit", authenticate, async (request, response) => {
    const roleInfo: IRoles = request.body;
    await editRoles(roleInfo).then(result => {
        response.json(result)
    });

});

adminrouter.post("/admin/privileges/edit", authenticate, async (request, response) => {
    const privilegeInfo: IPrivilegesRoles = request.body;
    await editPrivileges(privilegeInfo).then(result => {
        response.json(result)
    });
});

adminrouter.get("/admin/roles_privileges/:roles_id", authenticate, async (request, response) => {
    const uloge_id: number = parseInt(request.params.roles_id);
    await getPrivilagesRoles(uloge_id).then(rezultat => {
        response.json(rezultat)
    })
});



export default adminrouter;