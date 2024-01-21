"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var createUser = require("../controllers/AuthController");
var AuthController_1 = require("../controllers/AuthController");
var adminrouter = express.Router();
adminrouter.post("/user/create", createUser.createUser);
adminrouter.post("/login", AuthController_1.logIn);
exports.default = adminrouter;
