import express = require("express");
import createUser = require("../controllers/AuthController");
import {logIn} from "../controllers/AuthController";


const adminrouter = express.Router()

adminrouter.post("/user/create", createUser.createUser);
adminrouter.post("/login", logIn);

export default adminrouter;